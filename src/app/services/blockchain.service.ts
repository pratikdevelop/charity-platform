import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare let window: any; // To access MetaMask in the browser

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;

  private contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS';
  private contractABI = [
    // Add your contract ABI here
  ];

  constructor() {
    this.initBlockchain();
  }

  async initBlockchain() {
    if (window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
    } else {
      console.error('MetaMask not detected!');
    }
  }

  async donate(amount: string) {
    if (!this.contract) return;
    const tx = await this.contract['donate']({ value: ethers.parseEther(amount) });
    await tx.wait();
    return tx;
  }

  async getDonations() {
    if (!this.contract) return [];
    return await this.contract['getDonations']();
  }
}
