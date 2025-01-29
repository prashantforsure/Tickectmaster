const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenMaster", function () {
    let tokenMaster;
    let deployer;

    beforeEach(async () => {
        // Get contract factory and signers
        const TokenMaster = await ethers.getContractFactory("TokenMaster");
        ;[deployer] = await ethers.getSigners();

        // Deploy contract with name and symbol
        tokenMaster = await TokenMaster.deploy("TokenMaster", "TM");
    });

    describe("Deployment", () => {
        it("Sets the name", async () => {
            expect(await tokenMaster.name()).to.equal("TokenMaster");
        });

        it("Sets the symbol", async () => {
            expect(await tokenMaster.symbol()).to.equal("TM");
        });

        it("Sets the owner", async () => {
            expect(await tokenMaster.owner()).to.equal(deployer.address);
        });
    });
});