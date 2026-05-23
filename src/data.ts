import { Candidate } from "./types";

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Никита (Nikki)",
    age: 23,
    role: "Дизайнер / Креатор",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    username: "nikki_pixels",
    tags: ["Дизайн / Арт", "Создание контента", "Матча / Кофе"],
    vibeFacts: [
      "spent 48 hours tweaking a button border radius instead of sleeping",
      "always ready for spontaneous matchas in local creative hubs",
      "has a folder with 142 unfinished Figma portfolio drafts"
    ],
    matchScore: 94
  },
  {
    id: "2",
    name: "Артём (Temka)",
    age: 25,
    role: "Инди-разработчик / Фрилансер",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    username: "temka_solodev",
    tags: ["ИИ и Автоматизация", "Крипта", "Код по ночам"],
    vibeFacts: [
      "regularly stays up until 3AM exploring obscure smart contracts",
      "never replies to texts in under 12 hours unless it is a deployment emergency",
      "considers any software stack with more than three files over-engineered"
    ],
    matchScore: 88
  },
  {
    id: "3",
    name: "София (Sofia)",
    age: 22,
    role: "Сооснователь / Создатель",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    username: "sofia_launch",
    tags: ["Стартапы", "Фриланс / Инди", "Разговоры по душам"],
    vibeFacts: [
      "pitching matches in cold DMs while waiting in the matcha latte queue",
      "obsessed with viral loops and micro-influencer referral funnels",
      "can talk about retention strategies for 4 hours without taking a breath"
    ],
    matchScore: 91
  },
  {
    id: "4",
    name: "Кирилл (Kiri)",
    age: 24,
    role: "Специалист в компании",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    username: "kiri_growth",
    tags: ["ИИ и Автоматизация", "Музыка", "Мемы / Юмор"],
    vibeFacts: [
      "automating 90% of his daily job tasks with local LLMs to play synth",
      "convinced that the perfect ambient soundscape increases code throughput by 40%",
      "has a secret folder of tech memes that are legally too funny to post"
    ],
    matchScore: 82
  }
];
