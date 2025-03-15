document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');
    const quizBtn = document.getElementById('start-quiz');
    
    let totalSeconds = parseInt(timerElement.dataset.time) * 60; // Convert minutes to seconds
    let interval;
    let isRunning = false;
    
    function updateTimer() {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (totalSeconds <= 0) {
        clearInterval(interval);
        timerElement.textContent = '00:00';
        isRunning = false;
        
        // Enable quiz button
        quizBtn.disabled = false;
        quizBtn.classList.remove('btn-disabled');
        
        // Show completion message
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.textContent = 'Study session completed! You can now take the quiz.';
        document.querySelector('.timer-container').insertAdjacentElement('afterend', message);
      } else {
        totalSeconds--;
      }
    }
    
    startBtn.addEventListener('click', function() {
      if (!isRunning) {
        interval = setInterval(updateTimer, 1000);
        isRunning = true;
      }
    });
    
    pauseBtn.addEventListener('click', function() {
      clearInterval(interval);
      isRunning = false;
    });
    
    resetBtn.addEventListener('click', function() {
      clearInterval(interval);
      isRunning = false;
      totalSeconds = parseInt(timerElement.dataset.time) * 60;
      updateTimer();
    });
    
    // Initially disable quiz button
    if (quizBtn) {
      quizBtn.disabled = true;
      quizBtn.classList.add('btn-disabled');
    }
  });