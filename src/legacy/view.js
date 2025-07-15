document.addEventListener("DOMContentLoaded", function () {
  console.log("Legacy view.js loaded");

  const percentageElements = document.querySelectorAll(".legacy__tier-percentage");
  console.log("Percentage elements found:", percentageElements.length);

  if (percentageElements.length === 0) {
    console.log("No percentage elements found, exiting");
    return;
  }

  // Función para animar el contador
  function animateCounter(element, targetValue, duration = 2000) {
    console.log("Animating counter from 0 to", targetValue);
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Función de easing (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);
      element.textContent = currentValue + "%";

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue + "%";
        console.log("Animation completed for", targetValue + "%");
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Función para verificar si un elemento está visible
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Función para manejar la animación cuando el elemento es visible
  function handleScroll() {
    percentageElements.forEach((element) => {
      if (isElementInViewport(element)) {
        // Obtener el valor objetivo del data attribute o del textContent
        let targetValue = parseInt(
          element.dataset.targetValue || element.textContent.replace("%", ""),
          10
        );
        if (!isNaN(targetValue)) {
          // Guardar el valor objetivo si no está guardado
          if (!element.dataset.targetValue) {
            element.dataset.targetValue = targetValue.toString();
          }
          // Reiniciar el contador a 0 antes de animar
          element.textContent = "0%";
          animateCounter(element, targetValue);
        }
      }
    });
  }

  // Observador de intersección para mejor rendimiento
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Obtener el valor objetivo del data attribute o del textContent
          let targetValue = parseInt(
            entry.target.dataset.targetValue || entry.target.textContent.replace("%", ""),
            10
          );
          if (!isNaN(targetValue)) {
            // Guardar el valor objetivo si no está guardado
            if (!entry.target.dataset.targetValue) {
              entry.target.dataset.targetValue = targetValue.toString();
            }
            // Reiniciar el contador a 0 antes de animar
            entry.target.textContent = "0%";
            animateCounter(entry.target, targetValue);
          }
        }
      });
    },
    {
      threshold: 0.5, // Animar cuando el 50% del elemento sea visible
      rootMargin: "0px 0px -50px 0px", // Animar un poco antes de que esté completamente visible
    }
  );

  // Observar todos los elementos de porcentaje
  percentageElements.forEach((element) => {
    observer.observe(element);
  });

  // Fallback para navegadores que no soportan IntersectionObserver
  if (!window.IntersectionObserver) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Verificar elementos ya visibles
  }

  // Verificar elementos ya visibles al cargar
  handleScroll();
});
