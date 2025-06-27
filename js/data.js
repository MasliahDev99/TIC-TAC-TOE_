const GameData = {
  rowCategories: [
    { name: "Nacional", id: "nacional" },
    { name: "Peñarol", id: "penarol" },
    { name: "Campeón de América", id: "campeon_america" },
  ],
  colCategories: [
    { name: "Selección Uruguaya", id: "uruguay_nt", image: "../public/assets/auf.png" },
    { name: "Liga Argentina", id: "liga_argentina", image: "../public/assets/afa.png" },
    { name: "Premier League", id: "premier_league", image: "../public/assets/premier.png" },
  ],
  playerDatabase: {
    "luis suarez": ["nacional", "uruguay_nt", "premier_league", "campeon_america"],
    "diego forlan": ["penarol", "uruguay_nt", "premier_league", "campeon_america"],
    "enzo francescoli": ["liga_argentina", "uruguay_nt", "campeon_america"],
    "alvaro recoba": ["nacional", "uruguay_nt"],
    "edinson cavani": ["uruguay_nt", "campeon_america"],
    "diego godin": ["nacional", "uruguay_nt", "campeon_america"],
    "antonio pacheco": ["penarol"],
    "marcelo zalayeta": ["penarol", "uruguay_nt"],
    "sebastian abreu": ["nacional", "liga_argentina", "uruguay_nt", "campeon_america"],
    "carlos tevez": ["liga_argentina", "premier_league", "campeon_america"],
    "sergio aguero": ["premier_league", "liga_argentina", "campeon_america"],
  },
  validatePlayer: function (name, rowCategory, colCategory) {
    const playerName = name.toLowerCase().trim()
    const playerData = this.playerDatabase[playerName]

    if (!playerData) {
      return false
    }

    const hasRowCategory = playerData.includes(rowCategory)
    const hasColCategory = playerData.includes(colCategory)

    return hasRowCategory && hasColCategory
  },
}
