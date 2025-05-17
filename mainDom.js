        // Função para monitorar o scroll
        window.addEventListener('scroll', () => {
        // Altura total do documento
        const scrollHeight = document.documentElement.scrollHeight;
        
        // Altura do viewport (área visível)
        const clientHeight = document.documentElement.clientHeight;
        
        // Posição atual do scroll
        const scrollAtual = window.scrollY || window.pageYOffset;
        
        // Valor total do scroll possível
        const scrollTotal = scrollHeight - clientHeight;
        
        const porcentagem = (scrollAtual / scrollTotal) * 100;

        console.log(`Scroll total: ${scrollTotal}px`);
        console.log(`Posição atual: ${scrollAtual}px`);
        console.log(`Progresso: ${porcentagem.toFixed(2)}%`);

            let mainHeader = document.getElementById('mainHeader0');
            mainHeader.style.marginTop = (-scrollAtual/4)-21 + "px";
        
            let cloud4 = document.getElementById('cloud4');
            let cloud5 = document.getElementById('cloud5');

    if(scrollAtual >= 2384)
    {
        cloud5.style.marginTop = 3600 - (scrollAtual/4)+"px";
        cloud4.style.marginTop = 3900 - (scrollAtual/4)+"px";
    }
    else
    {
        cloud5.style.marginTop = 3600 + "px";
        cloud4.style.marginTop = 3900 + "px";
    }

    let parallax1 = document.getElementById('parallax1');
    let parallax2 = document.getElementById('parallax2');
    let parallax3 = document.getElementById('parallax3');

    if(scrollAtual >= 0)
    {
        parallax1.style.marginTop = -(scrollAtual/2)+'px';
        parallax2.style.marginTop = -(scrollAtual/3)+'px';
        parallax3.style.marginTop = -(scrollAtual/4)+'px';
    }
});

let game = document.getElementById('gameButtonLink');

game.addEventListener("click",function()
{
    window.scrollTo(0,4000);
});