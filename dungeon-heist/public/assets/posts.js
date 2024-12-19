import { createPostFromMarkdown } from "./../markdownUtils";

const sweInternshipGuide = `---
title: The Comprehensive Guide to Landing SWE Internships
date: 2024-12-04
abstract: A detailed guide for domestic US students on how to land software engineering internships, from application strategies to interview preparation, based on real experience landing 7 FAANG/quant tier offers.
headerImage: https://khrome.s3.us-east-1.amazonaws.com/images/metablue.png
imageCaption: I fumbled my chance to take a picture here
---


*This guide is for domestic US students. If you're international, almost everything here still applies, but it's 10x harder.*

There is a ton of tacit knowledge that one picks up while going from newbie CS student to veteran FAANG hunter. Every time I talk to a freshman I realize how much they don't even know they don't know. So I decided to write a detailed guide I wish I had when I was starting out. Why trust me? I have landed 7 FAANG/quant tier offers, from a T50 school with a 2.2 GPA. I am not some coding prodigy. My only experience with coding before college was trying to make a CSGO gambling site in middle school then giving up after learning I would have to teach myself 3 programming languages.

## Timeline

Summer internship applications usually open the year before. Some companies open as early as July, mostly banks and quants, with most tech companies opening in late August to mid-October. Some companies open as late as December or even January or February of the next year.

Usually, you apply and get ghosted or rejected. This is the default response. It's completely expected and don't be discouraged. The first 20 or so will sting. I couldn't believe Spotify didn't want me in my freshman year.

I applied to 300+ internships and got like 5 non-automated replies during my first cycle. Yes, a ~2% response rate is normal for non-T10 freshmen who have no prior experience (for those wondering, yes they're now churning out high schoolers with FAANG experience 😬).

In case you do get a response, here's usually how it goes:

OA (online assessment) -> Recruiter interview -> Technical interview (x1-3) -> offer

Takes 2-3 weeks from OA to offer.


## The Application Process

First, there's a distinction between automated OAs and normal OAs. Getting an automated OA means nothing. You have only passed the spam filter. A recruiter hasn't actually looked at your resume and decided "I will interview this person if they pass the OA". You can score perfectly on an automated OA and the recruiter will still most likely reject you simply because they reject 90% of applicants. On the other hand, acing a normal OA almost certainly means you're passing on to the next stage. So don't get too excited when Citadel gives you an OA. Google "does x company give automated OAs reddit" to see if yours was automated or not.

## Landing Your First Internship

Experience matters more than anything. Yes, it's a chicken-and-egg problem. By far, the hardest internship to land is your first one. Companies don't want to take a chance on someone who has no previous SWE internships because there is a good chance (maybe 25%) that you are an actual rock.

Once you get past your first internship, even if it's at some no-name small startup that went bust midway through your internship, it will help you a ton.

**Normal strategies:**
1. Go on your school's Handshake and see if any local companies posted anything
2. Apply to the 1st/2nd year internships from big companies like MetaU, Google STEP, NVIDIA Ignite, Amazon FE, and others. Later we will discuss how to stay informed about all these.
3. Go on LinkedIn, search SWE internship, and spam apply. Do this for 20 minutes every morning. Install a combination of Simplify and 1Password or some other form filler so 80-90% of the forms get instantly filled on most job portals. Don't bother with any other site except for maybe Ripplematch. All other sites simply scrape Linkedin. Ripplematch has some exclusive postings though.
4. Email/ask around staff/professors at your school to see if there's any email lists for jobs that you should be on. Often local companies want to hire a student for part-time minimum wage and those listings are distributed through some email list that most students aren't on for some reason.

**Desperation strategies:**
1. Look for lists of local startups, many websites have these. The best ones are found through INVESTOR websites. Example: for NYC go see what Betaworks is funding. Email the founders/random people in the startup and say why you're a good fit. Offer to work for minimum wage or free. 
2. JOIN START UP DISCORDS. I have gotten multiple offers from startups just because I was in their discord and chatted with the founders about the problem they are solving.
3. Sign up for one of those fellowships that take anyone. Ex: Headstarter. This looks better than a complete blank in the experience section.
4. Get one of your friends to start an LLC and "hire" you. You need to have a decent landing page. I have done this for many people.
5. Win a hackathon. (Hail Mary but was how I got my 2nd FAANG+ internship)
6. Message people on LinkedIn / email them using a shared commonality before asking for a referral. (One time I saw this E7 on a podcast and emailed him about how we had a similar background and he gave me a referral that got me straight to the final stage)
7. Gather recruiter emails from Apollo and email them.

## Resume

Use [Jake's resume template](https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs) - it was created by a group of scientists at DeepMind to maximize response rates.

[Here's my resume as an example](https://drive.google.com/file/d/1wfYVcxCGfsiTwprr5ow-sqSDPS8AJXlL/preview)

Here's how you calculate your resume's value:
- School name: 20% 
- Experience: 75%
- The other bs you spend 10 hours perfecting: 5%

Keep it simple. Focus on impact for your bullet points in the experience section. If you don't have a good school or prior experience then there's not really much you can do. Really impressive unique projects can help, but recruiters rarely can tell the difference between your new OS vs a CRUD app. Impact is easier to impress with. Recruiters will be impressed if you say your website gets 10k monthly visitors even if it's a simple todo app.

**Pro tip**: If you have a non-white name, write you're a US citizen (if you are) at the top of the resume.

## Next Steps

We all dream of landing Google STEP but let's be real, you got some random local company. That's OK. Here's what to do next:

During the school year make a few projects. Build a fancy CRUD app and a couple of low-level projects. Having only CRUD makes you seem like a code monkey and a lot of companies like to see that you know how a computer actually works even if you're gonna be writing Python on the job.

## DO LEETCODE

You have no excuse. Do you know what kind of work other people do? Medical students memorize textbooks, blue collar workers get up at 4am to clean toilets, kids in Africa carry sacks of sand or something. Us CS students do Leetcode.

Spend an hour on it every day. Follow Neetcode's path. Learn the basic algorithms and data structures. Don't wait for your actual DSA or algorithms course. Move on after 10 minutes if you aren't sure you can solve the problem. Look at the answer. Make sure you understand why it works. Note the gap in your understanding that caused your brain to not find the solution. Write down the reason, the trick. Then code it up on your own without looking at the answer. Come back to the same question in a week and solve it blind. Repeat if needed. At first, this whole process might take you as long as 40 minutes per question, maybe even longer for some. You will get through 1 question a day on average. But after a month or two you should speed up and be doing two a day.

You should have at least 250 questions done in your first year. I don't want to hear excuses. If you didn't do at least 250 questions then you really have no one to blame but yourself if you throw in an interview. Most of these 250 should be medium with a few dozen easies and 20-30 hards.

Some of you are gonna be very talented and become Leetcode gods in like 100 questions. Others will need more. Suck it up and do the work. In the grand scheme of things, this is one of the highest ROI ways to be spending your time.

A lot of people won't do this because they don't even get OAs and interviews. They will panic when they do get lucky and fumble their shot. Do not miss your shot.

If you don't get many interviews it's even more important you nail the few you get.

## Technical Interviews

Most FAANG-level interviews expect you to do an easy, then (1-2) mediums in 40 mins while explaining your thought process. If there's a third, you are usually ok even if you don't finish implementing the solution. Don't listen to the fearmongers who say they got a hard in some interview. It's very rare to get an actual hard. I have never gotten one in 10+ interviews. You should aim to reach the point where you can do 80% of mediums in <=15 mins.

The pressure of interviews makes you lose like 20 IQ points. So you will need that buffer. (I once messed up an easy that I did in 3 minutes 2 days before the interview)

If you're a nervous wreck like me, know it gets better with time. I was extremely nervous for my first interview, but now I barely get anxious. You can run or do some other aerobic exercise to calm your nerves.

Practice interviews with friends or with people from Reddit or Discord servers. This is really important. Unless you have significant experience interviewing, ALWAYS do at least one mock interview to prepare for the format. If you are a beginner do a lot more.

If you have Leetcode premium, search up questions that company has given out in the past and do the most common ones. If you don't, search for GitHub repos that regularly update these lists by scraping Leetcode. Also search csmajors/cscareer discord for people who have interviewed and DM them. It's against the rules but a lot of people respond and help out.

Different companies look for different things in interviews. In general, they just want you to communicate well and show a logical problem-solving approach.

When I say communication I don't mean explaining every line of code. I mean clarifying assumptions, making sure you understand the problem, discussing different solutions at a high level with your interviewer, explaining your logic for settling on one option, explaining your code at a high level as you write it, and then finally manually jumping through the lines of code and testing out examples and seeing if there are any edge cases.

![Screenshot of my problem solving framework](https://khrome.s3.us-east-1.amazonaws.com/images/Screenshot+2024-12-04+at+9.52.12%E2%80%AFPM.png){landscape}

One final crucial point: **NEVER EVER** start typing out code unless you're sure it's the right solution. This sucks for people like me who have an easier time problem solving while using Python as pseudocode, but most interviews auto-fail you if you ever have to backtrack or delete a large chunk of code because you realize this approach won't work.

## Behavioral / Recruiter Interviews

I don't know why people don't prepare for these, if you're at this stage you have passed the great filter and you should invest the time to prepare. Do at least 20 minutes of research and ask questions specific to the company. If you are bad at talking like me, then write up a doc where you introduce yourself, your past experiences and projects, why you're interested in the company, the questions you have, etc.

Sometimes these HR people ask you random stuff like "Tell me about a time you displayed leadership" or some bs. You need to answer these in the STAR format. Basically, you tell a story where you display the trait they are talking about. Start by explaining the situation/context, the problem you were faced with, what action you took and why, and the ultimate resolution. Make these up if you need to. Obviously always have a positive resolution.

Search up common behavioral questions and practice answering them. It's surprisingly harder than it sounds. A common strategy is to have 3-4 stories that you can twist to answer any question.

## Resources

You might be wondering how I myself became so knowledgeable and wise.

It's simple. I wasted 100s of hours on /r/csmajors and cscareer discord for the past 2.5 years. I don't know if I recommend you do the same. These places can be depressing, you also encounter some really cracked people who make you question wtf you're doing.

You get most of the important information I have gathered by just reading this guide. But you will not get the up-to-date company-specific info unless you regularly frequent those cesspools. There's also a sense of camaraderie, especially when you're starting out and all you get are rejections. If you had to choose one, definitely go with cscareer discord. The people there are far more knowledgeable in general.

If you want a course for DSA I recommend leetcode's own DSA course which is 90 bucks, I think 45 if you have premium. It's basically a much better version of grokking. Neetcode is also good. Just don't fall into the trap of buying courses then completing 5% then buying another one.

*I'm sure I still left out a ton of information that I'll add in when I think of it.*`;

export const posts = [createPostFromMarkdown(sweInternshipGuide, 1)];
