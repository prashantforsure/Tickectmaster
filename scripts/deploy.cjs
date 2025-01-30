const hre = require("hardhat")

// Fix the tokens function
const tokens = (n) => {
  return ethers.parseEther(n.toString())
}

async function main() {
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Get the ethers object
  const { ethers } = hre

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.waitForDeployment()

  console.log(`Contract deployed to: ${await tokenMaster.getAddress()}`)

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      cost: tokens(0.3),
      tickets: 100,  // Changed from 0 to give it some tickets
      date: "May 31",
      time: "6:00PM EST",
      location: "Miami-Dade Arena - Miami, FL"
    },
    {
      name: "Arijit singh concert",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM JST",
      location: "chennai, india"
    },
    {
      name: "India vs England",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM GMT",
      location: "Lords, Londan"
    },
    {
      name: "Real Madrid vs FC Barcelona",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM GMT",
      location: "Camp Nou, Barcelona"
    },
    {
      name: "Coldplay Concert",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM IST",
      location: "Mumbai, India"
    }
  ]

  for (let i = 0; i < occasions.length; i++) {
    const transaction = await tokenMaster.list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location
    )
    await transaction.wait()

    console.log(`Listed event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})