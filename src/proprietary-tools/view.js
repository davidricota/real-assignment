document.addEventListener("DOMContentLoaded", function () {
  const tabsContainers = document.querySelectorAll("[data-tabs]");

  tabsContainers.forEach((container) => {
    const tabTitles = container.querySelectorAll(".proprietary-tools__tab-title");
    const tabContents = container.querySelectorAll(".proprietary-tools__tab-content");

    function isMobile() {
      return window.innerWidth < 768;
    }

    function activateTab(tabIndex) {
      if (isMobile()) return;
      tabTitles.forEach((title) => {
        title.classList.remove("proprietary-tools__tab-title--active");
        title.setAttribute("aria-selected", "false");
        title.setAttribute("tabindex", "-1");
      });
      tabContents.forEach((content) => {
        content.classList.remove("proprietary-tools__tab-content--active");
      });
      const activeTitle = container.querySelector(`[data-tab-index="${tabIndex}"]`);
      const activeContent = container.querySelector(
        `[data-tab-index="${tabIndex}"].proprietary-tools__tab-content`
      );
      if (activeTitle && activeContent) {
        activeTitle.classList.add("proprietary-tools__tab-title--active");
        activeTitle.setAttribute("aria-selected", "true");
        activeTitle.setAttribute("tabindex", "0");
        activeContent.classList.add("proprietary-tools__tab-content--active");
      }
    }

    function toggleMobileAccordion(clickedContent) {
      if (!isMobile()) return;
      const isExpanded = clickedContent.classList.contains(
        "proprietary-tools__tab-content--expanded"
      );
      tabContents.forEach((content) => {
        content.classList.remove("proprietary-tools__tab-content--expanded");
        content.classList.add("proprietary-tools__tab-content--collapsed");
      });
      if (isExpanded) {
        clickedContent.classList.remove("proprietary-tools__tab-content--expanded");
        clickedContent.classList.add("proprietary-tools__tab-content--collapsed");
      } else {
        clickedContent.classList.remove("proprietary-tools__tab-content--collapsed");
        clickedContent.classList.add("proprietary-tools__tab-content--expanded");
      }
    }

    function handleResize() {
      if (isMobile()) {
        tabContents.forEach((content, index) => {
          if (index === 0) {
            content.classList.add("proprietary-tools__tab-content--expanded");
            content.classList.remove("proprietary-tools__tab-content--collapsed");
          } else {
            content.classList.add("proprietary-tools__tab-content--collapsed");
            content.classList.remove("proprietary-tools__tab-content--expanded");
          }
        });
      } else {
        const activeTab = container.querySelector(".proprietary-tools__tab-title--active");
        if (activeTab) {
          const tabIndex = activeTab.getAttribute("data-tab-index");
          activateTab(tabIndex);
        } else {
          activateTab(1);
        }
      }
    }

    function setupDesktopHover() {
      if (isMobile()) return;
      tabTitles.forEach((title) => {
        title.addEventListener("mouseenter", function () {
          const tabIndex = this.getAttribute("data-tab-index");
          const targetContent = container.querySelector(
            `[data-tab-index="${tabIndex}"].proprietary-tools__tab-content`
          );
          if (targetContent) {
            tabTitles.forEach((t) => t.classList.remove("proprietary-tools__tab-title--active"));
            tabContents.forEach((c) =>
              c.classList.remove("proprietary-tools__tab-content--active")
            );
            this.classList.add("proprietary-tools__tab-title--active");
            targetContent.classList.add("proprietary-tools__tab-content--active");
            this.setAttribute("aria-selected", "true");
            this.setAttribute("tabindex", "0");
          }
        });
        title.addEventListener("mouseleave", function () {
          const activeTab = container.querySelector(".proprietary-tools__tab-title--active");
          if (activeTab) {
            const activeIndex = activeTab.getAttribute("data-tab-index");
            activateTab(activeIndex);
          }
        });
      });
    }

    tabTitles.forEach((title) => {
      title.addEventListener("click", function (e) {
        e.preventDefault();
        if (!isMobile()) {
          const tabIndex = this.getAttribute("data-tab-index");
          activateTab(tabIndex);
        }
      });
      title.addEventListener("keydown", function (e) {
        if (isMobile()) return;
        const currentIndex = parseInt(this.getAttribute("data-tab-index"));
        let newIndex;
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            newIndex = currentIndex > 1 ? currentIndex - 1 : tabTitles.length;
            activateTab(newIndex);
            container.querySelector(`[data-tab-index="${newIndex}"]`).focus();
            break;
          case "ArrowRight":
            e.preventDefault();
            newIndex = currentIndex < tabTitles.length ? currentIndex + 1 : 1;
            activateTab(newIndex);
            container.querySelector(`[data-tab-index="${newIndex}"]`).focus();
            break;
          case "Home":
            e.preventDefault();
            activateTab(1);
            container.querySelector('[data-tab-index="1"]').focus();
            break;
          case "End":
            e.preventDefault();
            activateTab(tabTitles.length);
            container.querySelector(`[data-tab-index="${tabTitles.length}"]`).focus();
            break;
        }
      });
    });

    tabContents.forEach((content) => {
      content.addEventListener("click", function (e) {
        if (isMobile()) {
          const rect = this.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          if (clickY <= 60) {
            e.preventDefault();
            toggleMobileAccordion(this);
          }
        }
      });
    });

    handleResize();
    setupDesktopHover();
    window.addEventListener("resize", function () {
      handleResize();
      setupDesktopHover();
    });
  });
});

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const el = document.querySelector(".proprietary-tools");
    if (!el) {
      return;
    }
    const maxOffset = 100;
    let currentOffset = 0;
    let targetOffset = 0;
    let velocity = 0;
    let isScrolling = false;
    let scrollTimeout;
    function updateParallax() {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const percent = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
      const clamped = Math.max(-1, Math.min(1, percent));
      targetOffset = clamped * maxOffset;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
    function animateParallax() {
      if (isScrolling) {
        currentOffset = targetOffset;
        velocity = 0;
      } else {
        const diff = targetOffset - currentOffset;
        velocity += diff * 0.1;
        velocity *= 0.85;
        currentOffset += velocity;
        if (Math.abs(diff) < 0.1 && Math.abs(velocity) < 0.1) {
          currentOffset = targetOffset;
          velocity = 0;
        }
      }
      el.style.transform = `translateY(${currentOffset}px)`;
      el.style.transition = "all 2s cubic-bezier(0.235, 0.615, 0.185, 0.995)";
      el.style.willChange = "transform";
      requestAnimationFrame(animateParallax);
    }
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();
    animateParallax();
  });
})();
