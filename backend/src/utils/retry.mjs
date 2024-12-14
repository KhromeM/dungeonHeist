const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function withExponentialBackoff(operation, maxAttempts = 5) {
	let attempt = 1;

	while (attempt <= maxAttempts) {
		try {
			return await operation();
		} catch (error) {
			// Only retry on network related errors
			if (
				!error.message.includes("network") &&
				!error.message.includes("timeout") &&
				!error.message.includes("connection") &&
				!error.message.includes("SERVER_ERROR")
			) {
				throw error; // Not a network error, rethrow
			}

			if (attempt === maxAttempts) {
				throw new Error(
					`Failed after ${maxAttempts} attempts: ${error.message}`
				);
			}

			// Calculate delay: 2^attempt * 1000ms (1s, 2s, 4s, 8s, 16s)
			const delayMs = Math.min(1000 * Math.pow(2, attempt), 16000);
			console.log(`RPC call failed, retrying in ${delayMs / 1000}s...`);
			await wait(delayMs);
			attempt++;
		}
	}
}

// Helper function to wrap contract calls
export async function safeContractCall(contractFunction, ...args) {
	return withExponentialBackoff(async () => {
		return await contractFunction(...args);
	});
}
