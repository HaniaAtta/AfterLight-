window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot-screen');
    const startMenu = document.getElementById('start-menu');
  
    setTimeout(() => {
      bootScreen.classList.remove('active');
      startMenu.classList.add('active');
    }, 3000);
  });
  


  function showCircuit() {
    const menu = document.getElementById("menu-screen");
    const circuit = document.getElementById("circuit-screen");
  
    // Hide menu
    menu.style.opacity = 0;
  
    setTimeout(() => {
      menu.style.display = "none";
      circuit.classList.add("visible");
    }, 600); // Wait for fade out
  
    // Generate 10 robotic nodes
    const container = circuit.querySelector(".circuit-container");
    for (let i = 1; i <= 10; i++) {
      const node = document.createElement("div");
      node.className = "circuit-node";
      node.textContent = `Node ${i}`;
      container.appendChild(node);
    }
  }
  