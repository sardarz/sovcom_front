import { useState } from "react";
import ArrowDown from "./assets/arrow_down.png";
import ArrowUp from "./assets/arrow_up.png";

const Recruiter = () => {
  const dropDownData = [
    "Подборы",
    "События",
    "Календарь",
    "Вакансии",
    "Резюме",
  ];

  return (
    <main className="mx-auto grid h-[calc(100%_-_85px)] max-w-[1440px] grid-cols-[95px_270px_1fr]">
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
    </main>
  );
};

function CardsForJobs() {
  return (
    <section className="relative flex flex-col before:absolute before:-right-[2px] before:h-full before:w-[1px] before:bg-slate-300">
      <CurrentSelection />
      <ArchivedSelection />
    </section>
  );
}

function CurrentSelection() {
  const [closed, setClosed] = useState(false);
  const data = [
    {
      requestNum: "#330",
      jobs: [
        { position: "Фронтенд", description: "3 yoe", count: 3 },
        { position: "backend dev", description: "senior dev", count: 1 },
      ],
      active: false,
    },
    {
      requestNum: "#340",
      jobs: [
        { position: "Фронтенд", description: "3 yoe", count: 3 },
        { position: "backend dev", description: "senior dev", count: 1 },
      ],
      active: false,
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className={closed ? "closed" : ""}>
      <div
        className="mb-6 mt-6 flex cursor-pointer items-center justify-between px-6"
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
          ? "ml-auto max-w-[260px] rounded bg-slate-800 px-4 py-3 text-white"
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
