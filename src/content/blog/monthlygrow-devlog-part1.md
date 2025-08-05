---
id: "monthlygrow-devlog-part1"
emoji: "🎮📅🔄"
title_ko: "monthlyGrow 개발기 ①"
title_en: "monthlyGrow Devlog ①"
date: "2025-08-06 00:00:00"
author: "Sol Lee"
tags: ["career", "learning", "challenge", "ai", "mvp", "firebase"]
category: "devlog"
excerpt_ko: "'나에게 딱 맞는 계획-회고 시스템'을 만들기 위한 실험"
excerpt_en: "A Personal Experiment to Build My Own System"
---

한국어 본문은 하단에서 보실 수 있습니다 😁
**[한국어 본문 바로가기 →](#시작의-이유-세-가지-의도)**

## 🔰 Why I Started: Three Reasons

There were three clear reasons behind this project.

1. **I wanted a planning and reflection system that truly fits me.**  
   People who plan well, stay organized, and reflect regularly seem admirable—and I wanted to be like them.  
   I had tried many tools, but for someone like me who is more spontaneous, most productivity apps were either too rigid or too loose.  
   I could never maintain the flow, and I always failed to follow through with proper retrospectives.

2. **I needed something I could actually show outside of work.**  
   I spent over two years building the main product at my first company, but it was an internal tool—none of it was visible or sharable as a portfolio.  
   I wanted to build something of similar complexity and structure to demonstrate the work I had done.

3. **I wanted to do everything I couldn’t do at work.**  
   At work, I kept getting assigned to specific domains. I knew those parts well, but I didn’t get to design full system architecture, authentication flows, or data modeling.  
   This time, I wanted to freely explore the tech and tools I was curious about.

---

## 🎮 The Idea Came from a Game Called "Princess Maker"

One day while playing an old-life simulation game, I had this thought:

> “It’d be so helpful if I could see my own life mapped out like this.”
> “If someone planned my personal growth loop like this, it would be a dream.”

The game had a monthly loop of planning → execution → results, visualized with charts and stats.  
Most apps I had used couldn't do that properly.  
Among the structures I had tried, the PARA method stood out—it was loose but had a clear framework.

Because my interests and routines shift often, traditional habit trackers didn’t work for me.  
But a PARA-inspired monthly loop system felt just right.  
So I decided to build one—**a monthly loop system where AI helps you generate structured plans.**

---

## 🛠 A One-Woman Dev Team

Although this was a solo side project, I wasn't really alone. My team looked like this:

- 🧠 **Planner**: GPT
- 🎨 **Designer**: v0
- 👩‍💻 **Frontend teammate**: cursor
- 🔧 **Backend**: Firebase

They were all smarter than me, but context was their weakness.  
GPT lost track of the conversation during long chats and didn’t know the latest tech.  
v0 forgot user journeys.  
cursor got stuck in obvious errors and kept looping.  
And honestly, even I kept forgetting decisions I'd made and had to redraw the whole structure multiple times.

Still, I made the final calls—accepting feedback, questioning things, and learning through trial and error.

---

## ⚙️ How I Built the MVP

1. **Drafted the feature spec**: Each screen and logic flow written out in plain text
2. **Tested UI with v0**: Found gaps in planning via interactive previews
3. **Moved to code**: When v0 could no longer help, I switched to VSCode
4. **Hardcoded UI**: Laid out UI using sample data
5. **Connected Firebase**: Set up auth, restructured data models, integrated Firestore
6. **Designed queries**: Worked with cursor, implemented tanstack-query
7. **Built forms & validation**: Drafted create/edit flows, redefined required/optional fields
8. **Repeated UX + logic testing**: Restructured tabs/modals, tweaked reflection flows
9. **Deployed for testing**: Created sample accounts, shared with friends, collected bug reports

Each phase uncovered things that didn’t work—and forced me to revise earlier assumptions.  
That was the most frustrating (but revealing) part.

From phase 5 onward, I relied on cursor and even got a paid subscription.  
Now I’m in the testing stage—sending the app to friends and gathering edge case feedback.

---

## 🧩 Lessons in Structure

What I’m proudest of isn’t the UI—it’s the **structure that I can explain, maintain, and believe in.**

For example:

- **Automated snapshot & rollover on the 1st of each month**  
  Fetching multi-month data for the dashboard was costly and slow.  
  So I created a "snapshot" structure and used Firebase’s pub/sub cron to generate it automatically at 4 a.m. on the 1st—when users are likely asleep.  
  It also runs logic to **roll over incomplete projects** from the previous loop, keeping everything seamless for the user.

- **Clear rules + loose structure for project/loop connections**  
  Ideally, projects belong to a loop—but users might create them independently.  
  So `loopId` is optional, and when a project is created inside a loop, it auto-links.  
  Similarly, if no category exists for a project, a default “Uncategorized” area is created during onboarding.  
  This lets users work flexibly within light structure.

- **Reference design: loops and projects**  
  Initially, I thought loops should contain projects.  
  But after checking Firestore patterns with cursor, I realized it’s better for **projects to reference `connectedLoops`**.  
  That way, UI and data flows stayed clean.

- **Subcollections for project tasks**  
  Honestly, I didn’t fully understand this at first.  
  GPT and cursor both told me subcollections were safer and easier to maintain.  
  I still don’t totally grasp why—but it’s been working well so far.

As with my work at my last job, it’s not just about getting things to work.  
It’s about **knowing why you built it that way**—and being able to stand by those decisions.

---

## ✅ It’s Just an MVP, But...

The app’s not finished—this is only the MVP.  
Some might say “it’s just vibe coding.”  
But I spent months thinking, designing, breaking, and rebuilding.  
Now I’ve built something people can actually use, and I’m proud of that.  
Maybe now, when friends or family ask “So what do you even do at your job?”  
—I’ll finally have something to show them. 🤭

Next up?  
I want to use **MCP (Monthly Context Protocol)** and AI agents to automate the planning process.  
Instead of manually filling forms, users will describe their goals in natural language—and the app will turn that into structured projects and tasks.

For now, I’m still fixing bugs every day.  
But it feels good to write this reflection—on building a reflection app.

---

## 🔰 시작의 이유: 세 가지 의도

이 프로젝트를 시작한 이유는 분명했다.

1. **나에게 맞는 계획–회고 시스템을 만들고 싶었다.**  
   계획을 잘 세우고, 정리하고, 돌아보는 사람은 멋있어 보인다. 나도 그런 사람이 되고 싶었고, 나름의 시도는 있었다.
   그러나 자유분방한 나에게 기존 생산성 툴은 빡빡하거나, 지나치게 허술했다. 끝까지 흐름을 따라가기 어려웠고, 회고는 매번 흐지부지 끝났다.

2. **회사 바깥에 보여줄 수 있는 결과물이 필요했다.**  
   첫 회사에서 2년 넘게 메인 프로덕트를 만들었지만, 사내 툴이다보니 포트폴리오로 쓸 수 있는 화면도, 구조도 없었다. 그와 같을 순 없겠지만, 비슷한 복잡도와 구조의 앱을 만들어 내가 했던 일들을 증명하고 싶었다.

3. **회사에서 못 해본 걸 전부 해보고 싶었다.**  
   회사에서 몇 가지의 도메인을 계속 맡았다 보니, 해당 도메인의 구조는 꿰고 있었지만 전반적인 구조 설계나 인증 설계, 데이터 모델링 등을 직접 해 보지는 않았다. 이번에는 뭐가 됐든 내가 원하는 기술과 라이브러리를 마음껏 써보고 싶었다.

### 🎮 아이디어는 '프린세스 메이커'에서 시작됐다

어느 날, 오래된 육성 시뮬레이션 게임을 하다가 문득 이런 생각이 들었다.

> “내 인생도 이렇게 시각적으로 보이면 좋을 텐데.”
> “내 성장을 위한 루프도 누가 이렇게 계획해주면 진짜 편하겠다.”

월별 계획 → 실행 → 결과를 통계로 보는 구조가 반복되는 시스템의 게임이었다. 그동안 썼던 앱들로는 이걸 제대로 해내지 못했다. 그중 가장 적당한 구조는 PARA 시스템 기반의 흐름이었다. 느슨하지만 뼈대가 있다.

나는 관심사와 생활 패턴이 그때그때 바뀌다 보니 루틴형 시스템은 맞지 않았지만, PARA 기반의 루프라면 적당해 보였다. 그래서 그걸 바탕으로 **AI로 계획을 짤 수 있는 월간 루프 시스템**을 만들기로 했다.

---

## 🛠 나 혼자 모든 역할을 맡은 개발자 팀

개인 토이 프로젝트지만, 혼자가 아니었다. 내 팀원은 이렇게 구성됐다.

- 🧠 **기획자**: GPT
- 🎨 **디자이너**: v0
- 👩‍💻 **프론트엔드 팀원**: cursor
- 🔧 **백엔드**: firebase

문제는, 이 팀원들은 나보다 똑똑하지만 맥락이 약하다는 점이다. GPT는 대화가 길어지면 흐름을 잃었고 기술의 최신 업데이트 내용을 알지 못했다. v0는 사용자 여정을 기억하지 못했다. cursor는 뻔한 오류를 해결하지 못하고 빙빙 돌았다.

사실은 나 자신조차 기획 변경에 따라 구조를 잊고 다시 그릴 때가 많았다. 그래도 결국은 내 생각을 바탕으로 조율했고, 피드백을 받아들이되, 의심하고, 직접 테스트하면서 감각을 익혀갔다.

---

## ⚙️ MVP 개발은 이런 흐름으로 진행됐다

1. **텍스트 기획 정리**: 각 화면과 함수 흐름을 텍스트로 정리
2. **v0로 UI 테스트**: 실제 인터랙션을 보며 기획의 빈틈을 발견하고 수정
3. **코드로 이관**: v0가 못 알아듣는 시점부터 직접 VSCode로 개발 시작
4. **하드코딩 UI 구성**: 샘플 데이터를 기반으로 전체 UI 레이아웃 설계
5. **firebase 연동**: Auth 설정, 데이터 구조 재정리, firestore 연결
6. **query 설계**: 캐싱과 쿼리 전략 고민(주로 cursor), tanstack-query 도입
7. **폼 작성/validation**: 생성-수정 페이지 기획, 필수/옵셔널 값 재정의
8. **UI/기획 반복 실험**: 탭/모달 구성 변경, 회고 시각화 등 재설계
9. **테스트 배포**: 샘플 계정 생성, 친구들에게 링크 배포, 피드백 수집

각 단계가 진행할 때마다 뭔가 이상한 부분이 발견되고, 결국 기존 기획까지 야금야금 또 수정하게 된다. 그 때가 가장 머리를 쥐어뜯고 싶은 때이다. 5번 단계에서부터는 cursor의 도움이 필요했고, 유료 결제를 했다.

지금은 테스트 기간이다. 샘플 계정과 샘플 데이터를 왕창 밀어넣고 배포해, 친구들에게 링크를 주고 에러 케이스를 받는다.

---

## 🧩 시행착오로 익힌 설계 감각

개발이 끝났을 때 내가 가장 만족스러웠던 건 완성된 UI보다는 **실행 가능, 유지 가능, 납득 가능한 구조**였다.

예를 들어:

- 매달 1일, 자동 스냅샷 생성 + 이월 처리
  활동 대시보드에서 여러 달치 데이터를 한 번에 불러오면 쿼리 비용도 들고, UX도 느려질 수 있다는 문제가 있었다. 그래서 ‘스냅샷(snapshot)’이라는 구조를 따로 만들고, firebase pub/sub 크론 잡을 활용해 매달 1일 새벽 4시에 자동 생성되도록 했다. 대부분의 사용자가 앱을 쓰지 않을 시간대로 골랐다.
  동시에, 이전 루프에서 완료되지 않은 프로젝트를 자동으로 이월하는 로직도 함께 실행되며 반복 구조를 사용자 개입 없이 자연스럽게 이어지게 만든다.

- 프로젝트 연결 방식에 명확한 규칙 + 약간의 자유도
  기획 상 프로젝트는 루프에 귀속되어야 하지만, 사용자가 둘을 반대 순서로 생성할 가능성을 고려해 독립적으로 존재할 수도 있어야 했다. 그래서 프로젝트 생성 시에는 loopId를 optional로 두되, 루프 안에서 생성될 경우엔 자동 연결되는 구조로 설계했다.
  비슷하게 프로젝트가 속해야 하는 영역의 경우도 존재하지 않을 경우를 대비해 '미분류'를 가입 시 기본 데이터로 생성했다.
  결과적으로 사용자는 느슨한 규칙 안에서 유연하게 작업 흐름을 설계할 수 있었다.

- 루프와 프로젝트를 참조 ID로 연결한 방식
  루프와 프로젝트 UI 모두 서로의 정보를 보여줘야 했다. 처음에는 루프가 하위 프로젝트 목록을 가지고 있어야 할 것 같았지만, cursor에게 noSQL의 db 조회 패턴으로 미루어 어느 쪽이 참조값을 가지고 있는 것이 나은지 확인했다.
  실제 사용 흐름을 고려하면 프로젝트 쪽에서 connectedLoops를 참조하는 편이 더 자연스러웠다.

- 프로젝트 하위의 태스크는 '하위 컬렉션'으로 분리
  이것도 솔직히 내가 처음부터 잘 알고 선택한 건 아니다. Firestore에서는 문서 간 참조를 어떻게 구성하는 게 좋은지 몰라서 GPT와 커서에게 여러 번 물어봤고, “하위 컬렉션이 더 안전하고 직관적이다”는 말을 듣고 따라갔다.
  아직도 이 구조가 얼마나 유리한지는 정확히 체감하진 못하지만, 지금까지는 큰 문제 없이 동작하고 있다.

  그냥 작동되는 걸 만드는 게 아니라, 회사에서 일할 때처럼 **왜 이렇게 만들어야 하는지를 확인해 가면서** 개발할 수 있다는 점이 좋았다.

---

## ✅ 아직 MVP 단계지만

이 앱의 개발은 끝난 게 아니고 이제 겨우 MVP가 나왔을 뿐이다. 누군가는 “그냥 바이브 코딩이잖아”라고 말할지도 모르겠다. 하지만 나는 이걸 만들기 위해 몇 달간 기획하고, 구현하고, 부수고, 다시 세우는 과정을 반복했다.
그리고 그 결과 누군가 실제로 사용할 수 있는 형태의 앱을 만들어 냈다는 것이 자랑스럽다.
항상 '그래서 너 회사에서 뭐 하는데?'라고 묻던 가족고 친구들에게 선물할 수 있으리라는 점도. 🤭

앞으로는 이 구조를 기반으로, MCP(Monthly Context Protocol)와 AI 에이전트를 활용해 자동화하는 단계가 남아 있다. 사용자가 수많은 입력폼을 일일이 작성하지 않아도 되는 시스템을 만들고 싶다. 자연어나 단순한 인터페이스를 활용해 목표를 설명하면, 그에 맞는 프로젝트와 태스크가 생성되는 흐름이다.

아직은 매일매일 발견되는 에러를 잡는 나날이지만, 이렇게 회고 앱 만들기에 대한 회고를 적으며 여정을 정리해 본다.
