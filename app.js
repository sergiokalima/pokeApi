const inputText = document.getElementById('inputText');
const boton = document.getElementById('submit');
const mainPage = document.getElementById('mainPage');
const ctx = document.getElementById('grafico');

// const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
let query = '';
let apiKey = 'YW4t2E89Ea66WWYL5f4G1TWFC2d8LWbA'


boton.addEventListener('click', async (e) => {
  e.preventDefault();

  query = inputText.value

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`
  const response = await fetch(url)
  const data = await response.json()

  const urlPoke = `https://pokeapi.co/api/v2/pokemon/${query}`
  const responsePoke = await fetch (urlPoke)
  const dataPoke = await responsePoke.json()


  console.log(dataPoke)

  createGraph(dataPoke)

  data.data.forEach((el) =>{
    mainPage.innerHTML += `
    <div>
    <h2>${dataPoke.name}</h2>
    <img src=${el.images.original.url} alt=${el.title} />
    </div>
    `
  })

});



const createGraph = (pokemon) => {
  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: pokemon.stats.map((el) => el.stat.name),
      datasets: [{
      label: pokemon.name,
      data: pokemon.stats.map((el) => el.base_stat),
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(225, 205, 86)',
        'rgb(125, 65, 86)',
        'rgb(155, 59, 232)',
        'rgb(24, 262, 35)',
        'rgb(255, 99, 132)'
      ],
      hoverOffset: 4
    }]
  }
})
}

