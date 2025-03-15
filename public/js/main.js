document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Quiz validation
    const quizForm = document.querySelector('.quiz-form');
    
    if (quizForm) {
      quizForm.addEventListener('submit', function(e) {
        const questions = document.querySelectorAll('.question');
        let allAnswered = true;
        
        questions.forEach(function(question) {
          const options = question.querySelectorAll('input[type="radio"]');
          const answered = Array.from(options).some(option => option.checked);
          
          if (!answered) {
            allAnswered = false;
            question.classList.add('unanswered');
          } else {
            question.classList.remove('unanswered');
          }
        });
        
        if (!allAnswered) {
          e.preventDefault();
          alert('Please answer all questions before submitting.');
        }
      });
    }
    
    // Dropdown selection
    const branchSelect = document.getElementById('branch');
    const semesterSelect = document.getElementById('currentSemester');
    
    if (branchSelect) {
      branchSelect.addEventListener('change', function() {
        localStorage.setItem('selectedBranch', this.value);
      });
    }
    
    if (semesterSelect) {
      semesterSelect.addEventListener('change', function() {
        localStorage.setItem('selectedSemester', this.value);
      });
    }
    
    // Load saved values if available
    if (branchSelect && localStorage.getItem('selectedBranch')) {
      branchSelect.value = localStorage.getItem('selectedBranch');
    }
    
    if (semesterSelect && localStorage.getItem('selectedSemester')) {
      semesterSelect.value = localStorage.getItem('selectedSemester');
    }
  });