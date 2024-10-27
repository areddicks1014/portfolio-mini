/**
 * utility for mapping range
 * */
document.addEventListener('astro:page-load', () => {

  const mapRange = (inputLower: number, inputUpper: number, outputLower: number, outputUpper: number) => {
      const INPUT_RANGE = inputUpper - inputLower;
      const OUTPUT_RANGE = outputUpper - outputLower;
      return (value: number) =>
        outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
    };
    
    // const list = document.querySelector(".list-container");
    const items = document.querySelectorAll(".interactive");
    
    const updateMagnet = (event: any) => {
      const item = event.currentTarget;
      const xRange = item.magnetMapper.x(item.dataset.centerX - event.x);
      const yRange = item.magnetMapper.y(item.dataset.centerY - event.y);
      item.style.setProperty("--magnet-x", xRange);
      item.style.setProperty("--magnet-y", yRange);
      // Update list magnet if being used
      // list?.style.setProperty("--list-x", xRange);
      // list?.style.setProperty("--list-y", yRange);
    };
    
    const disableMagnet = (event: any) => {
      event.target.style.setProperty("--magnet-x", 0);
      event.target.style.setProperty("--magnet-y", 0);
      // Update list magnet if being used
      // list?.style.setProperty("--list-x", 0);
      // list?.style.setProperty("--list-y", 0);
      event.target.removeEventListener("pointermove", updateMagnet);
      event.target.removeEventListener("pointerleave", disableMagnet);
    };
    
    const activateMagnet = (event: any) => {
      const item = event.target;
      const bounds = item.getBoundingClientRect();
    
      // Cache the center position on enter
      item.dataset.centerX = bounds.x + item.offsetWidth * 0.5;
      item.dataset.centerY = bounds.y + item.offsetHeight * 0.5;
    
      // Cache the mapper against the element
      if (!item.magnetMapper) {
        item.magnetMapper = {
          x: mapRange(item.offsetWidth * -0.5, item.offsetWidth * 0.5, 1, -1),
          y: mapRange(item.offsetHeight * -0.5, item.offsetHeight * 0.5, 1, -1)
        };
      }
      // Optionally update the magnet for the list
      // list?.style.setProperty("--at", bounds.top);
      // list?.style.setProperty("--aw", bounds.right - bounds.left);
      // list?.style.setProperty("--ah", bounds.bottom - bounds.top);
      // list?.style.setProperty("--al", bounds.left);
    
      if (event.type === "pointerenter") {
        item.addEventListener("pointermove", updateMagnet);
        item.addEventListener("pointerleave", disableMagnet);
      }
    };
    
    items.forEach((item) => {
      item.addEventListener("pointerenter", activateMagnet);
      item.addEventListener("focus", activateMagnet);
    });
});
