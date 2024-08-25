import React, { useState } from 'react';
import BasicInfo from './components/BasicInfo';
import TournamentCheck from './components/TournamentCheck';
import FinalSubmission from './components/FinalSubmission';
import Questionnaire from './components/Questionnaire';
import './App.scss';

function App() {
  const [flow, setFlow] = useState(''); // 현재 흐름 (설문 or 티어 배정)
  const [step, setStep] = useState(0);  // 티어 배정 흐름의 단계
  const [surveyStep, setSurveyStep] = useState(0);  // 설문지 흐름의 단계

  const tournamentCheckData = [
    {
      date: "2023-03-01",
      eventName: "국가대표 선발전",
      category: "복식",
      result: "준우승",
      playerName: "김철수"
    },
    {
      date: "2022-06-15",
      eventName: "오픈 국화 대회",
      category: "단식",
      result: "우승",
      playerName: "홍길동"
    }
  ];

  const surveyQuestions = [
    {
      question: "선수 경험이 있습니까?",
      options: ["선수 경험없음", "테니스, 정구 선출", "타종목 선출"]
    },
    {
      question: "오픈 국화 대회 우승/입상 여부",
      options: ["YES", "NO"]
    },
    {
      question: "오픈 국화 대회 우승/입상 2회 이상 여부",
      options: ["YES", "NO"]
    },
    {
      question: "신입부/개나리 입상 및 우승 여부",
      options: ["YES", "NO"]
    },
    {
      question: "최근 2년동안 입상 내역 작성해 주세요.",
      options: ["입상 내역 있음", "입상 내역 없음"]
    }
  ];

  // 설문 단계 증가 및 설문 완료 시 최종 제출 화면으로 이동
  const nextSurveyStep = (answer) => {
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      setFlow('finalSubmission');
    }
  };

  // 설문 단계 감소
  const prevSurveyStep = () => {
    if (surveyStep > 0) {
      setSurveyStep(surveyStep - 1);
    }
  };

  // 티어 배정 단계 증가 및 최종 제출 화면으로 이동
  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setFlow('finalSubmission');
    }
  };

  // 티어 배정 단계 감소
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // 설문지 컴포넌트 렌더링
  const renderSurvey = () => (
    <Questionnaire
      question={surveyQuestions[surveyStep].question}
      options={surveyQuestions[surveyStep].options}
      onNext={nextSurveyStep}
      onPrevious={prevSurveyStep}
    />
  );

  // 티어 배정 흐름 렌더링
  const renderTierAssignment = () => {
    switch (step) {
      case 0:
        return <BasicInfo onNext={nextStep} />;
      case 1:
        return <TournamentCheck data={tournamentCheckData} onNext={nextStep} onPrevious={prevStep} />;
      case 2:
        return <FinalSubmission onPrevious={prevStep} />;
      default:
        return <BasicInfo onNext={nextStep} />;
    }
  };

  // 전체 컨텐츠 렌더링 관리
  const renderContent = () => {
    switch (flow) {
      case 'survey':
        return renderSurvey();
      case 'tierAssignment':
        return renderTierAssignment();
      case 'finalSubmission':
        return <FinalSubmission onPrevious={() => setFlow('tierAssignment')} />;
      default:
        return (
          <div className="selection-page">
            <h2>원하는 흐름을 선택하세요</h2>
            <div className="option-buttons">
              <button onClick={() => { setFlow('survey'); setSurveyStep(0); }}>
                설문지 시작
              </button>
              <button onClick={() => { setFlow('tierAssignment'); setStep(0); }}>
                예비티어 배정 시작
              </button>
            </div>
          </div>
        );
    }
  };

  // 헤더 렌더링 관리
  const renderHeader = () => {
    switch (flow) {
      case 'survey':
        return <h1>티어 배정 설문</h1>;
      case 'tierAssignment':
        return <h1>예비티어 배정</h1>;
      case 'finalSubmission':
        return <h1>최종 제출</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderHeader()}
      </header>
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
