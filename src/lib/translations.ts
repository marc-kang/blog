export const translations = {
  ko: {
    tagline: "we are already there. just connecting stuff",
    sectionDone: "해본 거",
    psychology: "인간이 뭔지 알고 싶어서 성균관대 심리 入學",
    music: "한국 음악 차트 인, 네덜란드 신인 전자음악 차트 1위, 300만 회 이상 내 노래 재생됨",
    musicLink: "프로듀싱한 음악들",
    reels: "어그로 좀 침, 인스타 릴스 730만뷰",
    startup: "창업 2회차, 유저 30만명으로 cash positive 근근히 넘기고 something big 찾는 중",
    fullStory: "full story",
    sectionLikes: "좋아하는 거",
    likes: "claude, 심리학, 철학 (요즘 니체랑 들뢰즈), 음악, 생산성, first principle thinking, 의미",
    dmPre: "dm me on",
    dmPost: "if you think in first principles & simple, and are a good, smart, weird person. let's be friends",
    flashMessage: "just go outside my friend.",
  },
  en: {
    tagline: "we are already there. just connecting stuff",
    sectionDone: "what i've done",
    psychology: "major in human psychology (SKKU) to understand human",
    music: "charted in Korea, #1 on Netherlands new electronic music chart, 3M+ plays on my songs",
    musicLink: "my productions",
    reels: "7.3M views on instagram reels",
    startup: "2nd startup, 300K users, cash positive, looking for something big",
    fullStory: "full story",
    sectionLikes: "things i like",
    likes: "claude, psychology, philosophy (nietzsche & deleuze lately), music, productivity, first principle thinking, meaning",
    dmPre: "dm me on",
    dmPost: "if you think in first principles & simple, and are a good, smart, weird person. let's be friends",
    flashMessage: "just go outside my friend.",
  },
} as const;

export type Locale = keyof typeof translations;
