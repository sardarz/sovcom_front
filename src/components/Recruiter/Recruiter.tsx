import { useState } from "react";
import ArrowDown from "./assets/arrow_down.png";
import ArrowUp from "./assets/arrow_up.png";
import { useSelector } from "react-redux";
import GeoLogo from "./assets/geo.png";
import {
  setCurrentCard,
  setCurrentPosition,
  getCurrentCardsPositions,
  getCurrentCard,
  getCurrentPositionIdx,
  getCurrentPositionData,
} from "../../features/recruiter/recruiterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Recruiter = () => {
  const dropDownData = [
    "Подборы",
    "События",
    "Календарь",
    "Вакансии",
    "Резюме",
  ];

  const currentPositionIdx = useAppSelector(getCurrentPositionIdx);

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
      <div className="bg-[#F5F6FA]">
        <div className="pl-8 pt-11">
          {currentPositionIdx !== null ? (
            <ShowPosition />
          ) : (
            <PositionDescription />
          )}
        </div>
      </div>
    </main>
  );
};

function ShowPosition() {
  const positionData = useAppSelector(getCurrentPositionData);
  if (positionData === null) {
    return <h1>no data</h1>;
  }
  return (
    <div>
      <div className="mb-5 max-w-[670px] rounded-lg bg-white px-8 py-7 shadow-sm">
        <p className="mb-4 text-2xl font-medium">{positionData.position}</p>
        <div className="mb-1 flex items-center gap-1">
          <img src={GeoLogo} alt="geologo" />
          <p>Нижний Новгород</p>
        </div>
        <p className="mb-1">Требуемый опыт работы: 1–3 года</p>
        <p className=" mb-7">Полная занятость, полный день</p>
        <button className=" h-[44px] w-[290px] rounded-2xl bg-[#1B378C] text-white">
          начать работу
        </button>
      </div>
      <div className="mb-5 max-w-[670px] rounded-lg bg-white px-8 py-7 shadow-sm">
        <p className="mb-4 text-lg font-medium">Ключевые навыки</p>
        <div className="flex flex-wrap gap-4">
          {positionData.keySkills.map((skill) => {
            return (
              <div className="rounded border-2 border-gray-400 px-2 py-1 text-xs">
                {skill}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-5 max-w-[670px] rounded-lg bg-white px-8 py-7 shadow-sm">
        <p className="mb-4 text-lg font-medium">Непубличная информация</p>
        <DisplayPositionList data={positionData.insider_info} />
      </div>
      <div className="mb-5 max-w-[670px] rounded-lg bg-white px-8 py-7 shadow-sm">
        <p className="mb-4 text-lg font-medium">Обязанности</p>
        <DisplayPositionList data={positionData.responsibilities} />
      </div>
    </div>
  );
}

function DisplayPositionList({ data }: { data: string[] }) {
  return (
    <ul className="list-disc">
      {data.map((info, idx) => {
        return (
          <li key={idx} className="relative left-6 text-sm">
            {info}
          </li>
        );
      })}
    </ul>
  );
}

function PositionDescription() {
  const dispatch = useAppDispatch();
  const currentCard = useAppSelector(getCurrentCard);
  const currentPositions = useAppSelector(getCurrentCardsPositions);

  return (
    <div className="  ">
      <div className="mb-9 max-w-[375px] rounded-lg bg-white p-8 shadow-lg">
        <p className="narrow mb-4 text-5xl font-bold">Набор {currentCard}</p>
        <p className="mb-1 text-sm">ООО «Вымпелком»</p>
        <p className="mb-1 text-sm">принят: 25.05.2023</p>
        <p className="mb-1 text-sm">закрыть до : 01.08.2023</p>
        <p className="text-sm">в работе дней: 3</p>
      </div>

      <div className="max-w-[min-content] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 grid grid-cols-[290px_85px_120px] items-end gap-[35px]">
          <p className="text-left text-2xl font-medium">Вакансии (0/3)</p>
          <p className=" text-sm">в работе, дн.</p>
          <p className=" text-sm">кандидатов</p>
        </div>
        {currentPositions &&
          currentPositions.map((pos, idx) => {
            return (
              <div
                key={idx}
                className="mb-4 grid grid-cols-[290px_85px_120px] items-end gap-[35px]"
              >
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setCurrentPosition(idx));
                  }}
                >
                  {pos.position} (0/3)
                </p>
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
  const data = useAppSelector((state) => state.recruiter.data);
  const [activeIdx, setActiveIdx] = useState(0);
  const dispatch = useAppDispatch();

  return (
    <section className={closed ? "closed" : ""}>
      <div
        className="mb-6 mt-6 flex cursor-pointer items-center justify-between "
        onClick={() => {
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
                setActiveIdx={() => {
                  setActiveIdx(idx);
                  dispatch(setCurrentCard({ card: c.requestNum }));
                  console.log("123");
                  dispatch(setCurrentPosition(null));
                }}
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
        {jobs.map(({ count, position }, idx) => {
          return (
            <li key={idx} className="">
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
