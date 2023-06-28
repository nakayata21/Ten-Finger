const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const timestamps = [];
    let typedChars = 0;
    let highScore = 0;
    let remainingTime = 60;
    let timerInterval;

    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomKey() {
      return keys[getRandomNumber(0, keys.length - 1)];
    }

    function targetRandomKey() {
      const key = document.getElementById(getRandomKey());
      key.classList.add("selected");
      let start = Date.now();
    }

    function getTimestamp() {
      return Math.floor(Date.now() / 1000);
    }

    function showKeyboard() {
      const startButton = document.getElementById("startButton");
      const keyboardWrapper = document.getElementById("keyboardWrapper");
    startButton.style.display ="none";
    startButton.style.cursor = "pointer";
      keyboardWrapper.style.display = "block";
      targetRandomKey();
    }

    document.getElementById("startButton").addEventListener("click", showKeyboard);

    document.addEventListener("keydown", (event) => {
      if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
      }

      const keyPressed = event.key.toUpperCase();
      const keyElement = document.getElementById(keyPressed);
      const highlightedKey = document.querySelector(".selected");

      keyElement.classList.add("hit");
      keyElement.addEventListener("animationend", () => {
        keyElement.classList.remove("hit");
      });

      if (keyPressed === highlightedKey.innerHTML) {
        timestamps.unshift(getTimestamp());
        const elapsedTime = timestamps[0] - timestamps[1];
        console.log(`Character per minute ${60 / elapsedTime}`);
        highlightedKey.classList.remove("selected");
        targetRandomKey();
        typedChars++;

        // Yeni skor, en yüksek skoru geçtiyse güncelle
        if (typedChars > highScore) {
          highScore = typedChars;
        }
        updateScore();
      }
    });

    function updateScore() {
      const scoreElement = document.getElementById("score");
      scoreElement.textContent = `Skor: ${typedChars}`;
    }

    function updateTimer() {
      const timerElement = document.getElementById("timer");
      timerElement.textContent = `Kalan süre: ${remainingTime} saniye`;

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        endGame();
      }

      remainingTime--;
    }

    function endGame() {
      const keyboardWrapper = document.getElementById("keyboardWrapper");
      keyboardWrapper.style.display = "none";
      const resultDiv = document.createElement("div");
      resultDiv.textContent = `Oyun Bitti! Tebrikler🫶🏻 Skor: ${typedChars}. En yüksek rekor: ${highScore}`;
      document.body.appendChild(resultDiv);
    }