import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

function App() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          if(window.location.hostname !== "mentorpick.com"){
            return "";
          }
          var xpath = '//*[@id="root"]/div[1]/header/div/div[3]/div[1]';
          var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          var userIdElement = result.singleNodeValue;
          return userIdElement ? userIdElement.textContent : null;
        }
      }, ([result]) => {
        if (result) {
          setUserId(result.result);
        }
      });
    });
  }, []);
  return (
    <>

      {userId !== "" && <QRCode value={userId}/>}
      <p>{userId === "" ? "Not Signed In" : "Hello" + userId}</p>
    </>
  )
}

export default App
