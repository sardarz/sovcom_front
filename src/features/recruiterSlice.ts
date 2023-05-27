import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const data = [
  {
    requestNum: "#330",
    jobs: [
      {
        position: "Офис-менеджер ",
        description: "3 года опыта работы",
        count: 3,
        keySkills: [
          "документооборот",
          "деловая переписка",
          "стрессоустойсивость",
          "многозадачность",
          "Обеспечение жизнедеятельности офиса",
        ],
        responsibilities: [
          "организация системы делопроизводства в офисе, включая электронный документооборот;",
          "ведение деловой переписки;",
          "обеспечение жизнедеятельности офиса;",
        ],
        requirements: [
          "опыт работы: от 1 года;",
          "опыт ведения деловой переписки, грамотность при написании документов;",
          "умение самостоятельно искать ответы на поставленные вопросы;",
        ],
      },
      {
        position: "Backend dev ",
        description: "3 года опыта работы",
        count: 3,
        keySkills: ["Python", "JS", "MongoDB", "OOP"],
        responsibilities: [
          "обеспечение жизнедеятельности офиса;",
          "организация системы делопроизводства в офисе, включая электронный документооборот;",
          "ведение деловой переписки;",
        ],
        requirements: [
          "опыт ведения деловой переписки, грамотность при написании документов;",
          "опыт работы: от 5 лет;",
          "умение самостоятельно искать ответы на поставленные вопросы;",
        ],
      },
    ],
  },
  {
    requestNum: "#330",
    jobs: [
      {
        position: "Офис-менеджер ",
        description: "3 года опыта работы",
        count: 3,
        keySkills: [
          "документооборот",
          "деловая переписка",
          "стрессоустойсивость",
          "многозадачность",
          "Обеспечение жизнедеятельности офиса",
        ],
        responsibilities: [
          "организация системы делопроизводства в офисе, включая электронный документооборот;",
          "ведение деловой переписки;",
          "обеспечение жизнедеятельности офиса;",
        ],
        requirements: [
          "опыт работы: от 1 года;",
          "опыт ведения деловой переписки, грамотность при написании документов;",
          "умение самостоятельно искать ответы на поставленные вопросы;",
        ],
      },
      {
        position: "Backend dev ",
        description: "3 года опыта работы",
        count: 3,
        keySkills: ["Python", "JS", "MongoDB", "OOP"],
        responsibilities: [
          "обеспечение жизнедеятельности офиса;",
          "организация системы делопроизводства в офисе, включая электронный документооборот;",
          "ведение деловой переписки;",
        ],
        requirements: [
          "опыт ведения деловой переписки, грамотность при написании документов;",
          "опыт работы: от 5 лет;",
          "умение самостоятельно искать ответы на поставленные вопросы;",
        ],
      },
    ],
  },
];

const cards = data.map((el) => el.requestNum);
const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    data,
    cards,
    currentlySelectedPosition: 0,
    currentlySelectedCard: cards[0],
  },
  reducers: {
    changeCurrentlySelectedFields(
      state,
      action: PayloadAction<{ position: number; card: string }>
    ) {
      // const newSelectedCardIdx = state.data.findIndex(el => el.requestNum === action.payload.card)
      state.currentlySelectedCard = action.payload.card;
      state.currentlySelectedPosition = action.payload.position;
    },
  },
});

export const { changeCurrentlySelectedFields } = recruiterSlice.actions;

export default recruiterSlice.reducer