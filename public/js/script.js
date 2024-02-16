document.querySelectorAll('.commentContent').forEach(textarea => {
    textarea.addEventListener('input', function() {
        var commentContent = this.value.trim();
        var postBtn = this.nextElementSibling;

        if (commentContent.length > 0) {
            postBtn.style.display = 'block';
        } else {
            postBtn.style.display = 'none';
        }
    });
});

(function($) {
    $(function() {
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
      $('html').click(function() {
        $('.nav-dropdown').hide();
      });
      $('#nav-toggle').click(function() {
        $('nav ul').slideToggle();
      });
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    });
  })(jQuery);

  document.addEventListener("DOMContentLoaded", function(event) { 
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};

const stories = Array.from(document.querySelectorAll('.stories__item'));

stories.map(item => {
  const button = item.querySelector('button');
  
  button.addEventListener('click', () => {
    item.classList.toggle('stories__item--active');
  });
});