import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    store_type: '감성 카페',
    menu: '딸기 생크림 케이크',
    event: '10% 할인',
    style: '귀엽고 다정한 말투'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      const response = await axios.post('http://localhost:8000/api/generate-text', formData);
      setResult(response.data);
    } catch (error) {
      console.error("생성 실패:", error);
      alert("백엔드 서버 연동 실패! backend-repo에서 uvicorn 서버가 켜져 있는지 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    if (!result) return;

    const hashtags = Array.isArray(result.hashtags)
      ? result.hashtags.join(' ')
      : result.hashtags;

    const fullText = `${result.main_headline}

    ${result.body_content}

    ${hashtags}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFF2B2', // 따뜻하고 밝은 노랑 배경
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", "Jua", sans-serif',
      color: '#222',
      boxSizing: 'border-box'
    }}>
      {/* 상단 귀여운 제목 & 캐릭터 느낌 */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '42px', marginBottom: '8px' }}>🎂 🐰 💖</div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#FF2E93', // 키치 핑크
          textShadow: '3px 3px 0px #80E3D1', // 민트 테두리 효과
          margin: 0
        }}>
          당신을 위한... AI 홍보 문구 ♡
        </h1>
        <p style={{ color: '#00B894', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
          ★ 소상공인 마법의 카피 제작소 ★
        </p>
      </header>

      {/* 카드 레이아웃 */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'center'
      }}>
        
        {/* 입력 폼 카드 */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #FF7675',
          padding: '30px',
          width: '100%',
          maxWidth: '420px',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '20px', color: '#6C5CE7', marginBottom: '20px', textAlign: 'center' }}>
            ✏️ 정보를 적어줘!
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>🏷️ 업종</label>
              <input type="text" name="store_type" value={formData.store_type} onChange={handleChange} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>🍰 대표 메뉴 / 상품</label>
              <input type="text" name="menu" value={formData.menu} onChange={handleChange} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>🎉 이벤트 / 할인 정보</label>
              <input type="text" name="event" value={formData.event} onChange={handleChange} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>💬 분위기 / 말투</label>
              <input type="text" name="style" value={formData.style} onChange={handleChange} style={inputStyle} required />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#CCCCCC' : '#FF4757',
                color: '#FFFFFF',
                border: '3px solid #000000',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: '900',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '10px',
                boxShadow: loading ? 'none' : '4px 4px 0px #000000',
                transition: 'all 0.1s ease'
              }}
            >
              {loading ? 'AI 촛불 켜는 중...🕯️' : '뿅! 문구 만들기 ♡'}
            </button>
          </form>
        </div>

        {/* 결과 카드 */}
        {result && (
          <div style={{
            backgroundColor: '#80E3D1', // 파스텔 민트
            borderRadius: '30px',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px #6C5CE7',
            padding: '30px',
            width: '100%',
            maxWidth: '420px',
            boxSizing: 'border-box'
          }}>
            <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#FF2E93', marginBottom: '10px' }}>
              ✨ 축! 생성 완료 ✨
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '3px solid #000000',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#FF4757', margin: 0, lineHeight: '1.4' }}>
                {result.main_headline}
              </h3>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '3px solid #000000',
              padding: '16px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#222',
              whiteSpace: 'pre-line',
              marginBottom: '16px'
            }}>
              {result.body_content}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '25px' }}>
              {(Array.isArray(result.hashtags) ? result.hashtags : [result.hashtags]).map((tag, idx) => (
                <span key={idx} style={{
                  backgroundColor: '#FFFA65',
                  color: '#000',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  border: '2px solid #000',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {tag}
                </span>
              ))}
            </div>
	    <button
	      onClick={copyAll}
	      style={{width: '100%', padding: '9px', backgroundColor: copied ? '#00B894' : '#FF4757', 
	        color: '#FFFFFF', border: '3px solid #000000', borderRadius: '20px', fontSize: '15px', fontWeight: '900',
	        cursor: 'pointer', boxShadow: '4px 4px 0px #000000', transition: 'all 0.15s ease'
	      }}>
	        {copied ? '✓ 복사되었어요!' : '📋 전체 내용 복사'}
	    </button>
          </div>

	  
        )}

      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#222',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '15px',
  border: '3px solid #000000',
  backgroundColor: '#FFF8E7',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontWeight: 'bold'
};

export default App;