import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const TournamentCheck = ({ data, onNext, onPrevious }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tournamentEntries, setTournamentEntries] = useState(data);
  const [newEntry, setNewEntry] = useState({ date: '', eventName: '', category: '', result: '', playerName: '' });
  const [showInput, setShowInput] = useState(false);

  const handleItemClick = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.eventName) {
      const newEntryFormatted = {
        ...newEntry,
        date: new Date(newEntry.date).toISOString() // ISO string으로 저장
      };
      setTournamentEntries([...tournamentEntries, newEntryFormatted]);
      setNewEntry({ date: '', eventName: '', category: '', result: '', playerName: '' });
      setShowInput(false); // Hide input fields after adding
    } else {
      alert("대회명과 날짜를 입력하세요.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleCancel = () => {
    setNewEntry({ date: '', eventName: '', category: '', result: '', playerName: '' });
    setShowInput(false);
  };

  return (
    <div className="tournament-check">
      <h2>타 대회 성적 체크</h2>
      <div className="tournament-list">
        {tournamentEntries.map((item, index) => (
          <div
            key={index}
            className={`tournament-row ${selectedItems.includes(index) ? 'selected' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            <div className="tournament-info">
              <span className="tournament-date">{item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
              <span className="tournament-event">{item.eventName}</span>
              <span className="tournament-details">
                {item.category} {item.result} {item.playerName}
              </span>
            </div>
          </div>
        ))}
      </div>
      {showInput ? (
        <div className="new-entry-form">
          <input
            type="date"
            name="date"
            placeholder="날짜 (YYYY-MM-DD)"
            value={newEntry.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="eventName"
            placeholder="대회명"
            value={newEntry.eventName}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={newEntry.category}
            onChange={handleInputChange}
          >
            <option value="">단식/복식</option>
            <option value="단식">단식</option>
            <option value="복식">복식</option>
          </select>
          <input
            type="text"
            name="result"
            placeholder="성적"
            value={newEntry.result}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="playerName"
            placeholder="선수명"
            value={newEntry.playerName}
            onChange={handleInputChange}
          />
          <div className="button-group">
            <button onClick={handleCancel} className="cancel-button">취소</button>
            <button onClick={handleAddEntry}>입력 완료</button>
          </div>
        </div>
      ) : (
        <button className="add-button" onClick={() => setShowInput(true)}>추가하기</button>
      )}
      <div className="navigation-buttons">
        <button className="prev-button" onClick={onPrevious}>
          이전
        </button>
        <button onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default TournamentCheck;
