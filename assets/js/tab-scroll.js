// Navegação entre abas usando o scroll do mouse
window.addEventListener('DOMContentLoaded', function () {
  var tabsList = document.querySelector('.md-tabs__list');
  if (!tabsList) return;

  tabsList.addEventListener('wheel', function (e) {
    // Só navega se não estiver rolando horizontalmente
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      var tabs = Array.from(tabsList.querySelectorAll('.md-tabs__item'));
      var active = tabsList.querySelector('.md-tabs__item--active');
      var idx = tabs.indexOf(active);
      if (e.deltaY > 0 && idx < tabs.length - 1) {
        tabs[idx + 1].querySelector('a').click();
      } else if (e.deltaY < 0 && idx > 0) {
        tabs[idx - 1].querySelector('a').click();
      }
    }
  }, { passive: false });
});
