window.disableScroll = function () {
  document.body.style.cssText = `
        position: relative;
        overflow:hidden;
        height: 100vh;
    `;
};

window.enableScroll = function () {
  document.body.style.cssText = ``;
};
