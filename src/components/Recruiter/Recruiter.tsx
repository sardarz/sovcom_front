import { useState } from "react";
import ArrowDown from "./assets/arrow_down.png";
import ArrowUp from "./assets/arrow_up.png";
import { useSelector } from "react-redux";
import {
  getCurrentCardsPositions,
  getCurrentlySelectedCard,
  getCurrentlySelectedPosition,
} from "../../features/recruiterSlice";
import { useAppSelector } from "../../app/hooks";

const Recruiter = () => {
  const dropDownData = [
    "Подборы",
    "События",
    "Календарь",
    "Вакансии",
    "Резюме",
  ];

  return (
    <main className="mx-auto grid h-[calc(100%_-_85px)] max-w-[1440px] grid-cols-[95px_275px_1fr]">
      <div className="flex flex-col items-center gap-[44px] bg-[#cecece] pt-[44px]">
        {dropDownData.map((_, idx) => {
          return (
            <div
              key={idx}
              className="h-[54px] w-[54px] cursor-pointer rounded-full bg-[#d9d9d9]"
            ></div>
          );
        })}
      </div>
      <CardsForJobs />
      <PositionDescription />
    </main>
  );
};

function PositionDescription() {
  const currentCard = useAppSelector(getCurrentlySelectedCard);
  const currentPositions = useAppSelector(getCurrentCardsPositions);

  return (
    <div className=" bg-[#F5F6FA] pt-11">
      <div className="mb-9 ml-8 max-w-[375px] rounded-lg bg-white p-8 shadow-lg">
        <p className=" bebas mb-4 text-5xl">Set {currentCard}</p>
        <p className="mb-1 text-sm">ООО «Вымпелком»</p>
        <p className="mb-1 text-sm">принят: 25.05.2023</p>
        <p className="mb-1 text-sm">закрыть до : 01.08.2023</p>
        <p className="text-sm">в работе дней: 3</p>
      </div>

      <div className="ml-8 max-w-[min-content] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 grid grid-cols-[290px_85px_120px] items-end gap-[35px]">
          <p className="text-left text-2xl font-medium">Вакансии (0/3)</p>
          <p className=" text-sm">в работе, дн.</p>
          <p className=" text-sm">кандидатов</p>
        </div>
        {currentPositions &&
          currentPositions.map((pos, idx) => {
            return (
              <div key={idx} className="mb-4 grid grid-cols-[290px_85px_120px] items-end gap-[35px]">
                <p>{pos.position} (0/3)</p>
                <p>0</p>
                <p>0</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function CardsForJobs() {
  return (
    // <section className="relative flex flex-col before:absolute before:-right-[2px] before:h-full before:w-[1px] before:bg-slate-300">
    <section className="relative flex flex-col px-2">
      <CurrentSelection />
      <ArchivedSelection />
    </section>
  );
}

function CurrentSelection() {
  const [closed, setClosed] = useState(false);
  // const data = [
  //   {
  //     requestNum: "#330",
  //     jobs: [
  //       { position: "Фронтенд", description: "3 yoe", count: 3 },
  //       { position: "backend dev", description: "senior dev", count: 1 },
  //     ],
  //     active: false,
  //   },
  //   {
  //     requestNum: "#340",
  //     jobs: [
  //       { position: "Фронтенд", description: "3 yoe", count: 3 },
  //       { position: "backend dev", description: "senior dev", count: 1 },
  //     ],
  //     active: false,
  //   },
  // ];
  const data = useAppSelector(state => state.recruiter.data)
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className={closed ? "closed" : ""}>
      <div
        className="mb-6 mt-6 flex cursor-pointer items-center justify-between "
        onClick={(e) => {
          setClosed(!closed);
        }}
      >
        <p className="text-2xl font-medium">Подборы</p>
        <div>
          <img src={ArrowDown} className={closed ? "" : "hidden"} alt="" />
          <img src={ArrowUp} className={closed ? "hidden" : ""} alt="" />
        </div>
      </div>

      <ul className={closed ? "hidden" : "" + " " + "flex flex-col gap-3"}>
        {data.map((c, idx) => {
          return (
            <li key={idx}>
              <CurrentSelectionCard
                requestNum={c.requestNum}
                jobs={c.jobs}
                active={activeIdx === idx}
                setActiveIdx={() => setActiveIdx(idx)}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

interface ICurrentSelectionCard {
  requestNum: string;
  jobs: IJob[];
  active: boolean;
  setActiveIdx: () => void;
}

interface IJob {
  position: string;
  description: string;
  count: number;
}

function CurrentSelectionCard({
  requestNum,
  jobs,
  active,
  setActiveIdx,
}: ICurrentSelectionCard) {
  return (
    <div
      className={
        active
          ? "ml-auto max-w-[260px] rounded bg-[#1B378C] px-4 py-3 text-white"
          : "ml-auto max-w-[260px] rounded bg-slate-100 px-4 py-3 text-black"
      }
    >
      <p
        className="mb-3 cursor-pointer text-2xl font-medium"
        onClick={setActiveIdx}
      >
        {requestNum}
      </p>
      <ul className={"flex flex-col gap-3"}>
        {jobs.map(({ count, description, position }, idx) => {
          return (
            <li
              key={idx}
              className="cursor-pointer"
              onClick={() => {
                if (active) console.log(idx, position);
              }}
            >
              {position} ({count})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ArchivedSelection() {
  return <div></div>;
}

export default Recruiter;

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
        position: "Офис-менеджер",
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
