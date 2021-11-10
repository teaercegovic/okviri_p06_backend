
let poruke = [
    {
      id: 1,
      sadrzaj: 'HTML je jednostavan',
      vazno: true
    },
    {
      id: 2,
      sadrzaj: 'React koristi JSX sintaksu',
      vazno: false
    },
    {
      id: 3,
      sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
      vazno: true
    }
  ]
  
  const express = require('express')
  const cors = require('cors')
  const app = express()
  app.use(express.static('build'))
  app.use(cors())
  app.use(express.json())
  
    
  app.get('/', (req, res) =>{
    res.send('<h1>Pozdrav od Express servera!</h1>')
  })
  
  app.get('/api/poruke', (req, res) =>{
    res.json(poruke)
  })

  app.get('/api/poruke/:id', (req, res) =>{
    const id = Number(req.params.id)
    const poruka = poruke.find(p => p.id === id)
    
    if (poruka){
      res.json(poruka)
    } else {
      res.status(404).end()
    }
  })

  app.delete('/api/poruke/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log("Brisem poruku sa ID:", id);
    //poruke = poruke.filter(p => p.id !== id)
  
    res.status(204).end()
  })
  
  app.post('/api/poruke', (req, res) => {

    const podatak = req.body
    if(!podatak.sadrzaj){
      return res.status(400).json({
        error: 'Nedostaje sadržaj'
      })
    }
    
    const poruka = {
      sadrzaj: podatak.sadrzaj,
      vazno: podatak.vazno || false,
      datum: new Date(),
      id: generirajId()
    }
    poruke = poruke.concat(poruka)
    
    res.json(poruka)
  })

  app.put('/api/poruke/:id', (req, res) => {

    const podatak = req.body
    const id = Number(req.params.id)
    console.log("Promjena važnosti poruke sa ID", id)
    poruke = poruke.map(p => p.id !== id ? p : podatak)
    console.log(poruke)   
    res.json(podatak)
  })

  const generirajId = () => {
    const maxId = poruke.length > 0
      ? Math.max(...poruke.map(p => p.id))
      : 0
    return maxId + 1
  }

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
  })
