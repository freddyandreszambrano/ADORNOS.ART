const faqs= document.querySelectorAll(".acordion");

faqs.forEach(acordion =>{
    acordion.addEventListener("click", () =>{
        acordion.classList.toggle("active");
    })
})