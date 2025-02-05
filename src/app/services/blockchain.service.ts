import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare let window: any;
declare let paypal: any;
declare let Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: any;

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

  async donate(amount: any) {
    if (!this.contract) return;
    const tx = await this.contract.donate({ value: ethers.parseEther(amount) });
    await tx.wait();
    return tx;
  }

  async getDonations(charityAddress: string) {
    if (!this.contract) return [];
    const donations = await this.contract.getDonations(charityAddress);
    return donations.map((d: any) => ({
      donor: d.donor,
      amount: ethers.formatEther(d.amount),
      timestamp: new Date(d.timestamp * 1000),
    }));
  }

  async registerCharity(
    name: string,
    description: string,
    wallet: string,
    regNumber: string,
    website: string,
    contactEmail: string,
    contactPhone: string,
    bankAccount: string,
    ifscCode: string,
    categories: string[],
    socialLinks: { twitter?: string; facebook?: string; instagram?: string }
  ) {
    if (!this.contract) return;
    const tx = await this.contract.registerCharity(
      name,
      description,
      wallet,
      regNumber,
      website,
      contactEmail,
      contactPhone,
      bankAccount,
      ifscCode,
      categories.join(','),
      JSON.stringify(socialLinks)
    );
    await tx.wait();
    return tx;
  }

  async getCharities() {
    if (!this.contract) return [];
    const addresses = await this.contract.getAllCharities();
    const charities = await Promise.all(
      addresses.map(async (addr: string) => {
        const charity = await this.contract.charities(addr);
        return {
          wallet: charity.wallet,
          name: charity.name,
          description: charity.description,
          regNumber: charity.regNumber,
          website: charity.website,
          contactEmail: charity.contactEmail,
          contactPhone: charity.contactPhone,
          bankAccount: charity.bankAccount,
          ifscCode: charity.ifscCode,
          categories: charity.categories.split(','),
          socialLinks: JSON.parse(charity.socialLinks),
          isVerified: charity.isVerified,
        };
      })
    );
    return charities.filter(c => c.isVerified);
  }

  async verifyCharity(charityAddress: string) {
    if (!this.contract) return;
    const tx = await this.contract.verifyCharity(charityAddress);
    await tx.wait();
    return tx;
  }

  async getDonationStats(charityAddress: string) {
    if (!this.contract) return { total: 0, count: 0 };

    const total = await this.contract.totalDonations(charityAddress);
    const count = await this.contract.donationCount(charityAddress);

    return {
      total: ethers.formatEther(total),
      count: Number(count),
    };
  }

  // New Methods for Non-Crypto Payments

  processUPIDonation(amount: number, upiID: string) {
    console.log(`Processing UPI donation of ₹${amount} to ${upiID}`);
    return `upi://pay?pa=${upiID}&pn=Charity&mc=1234&tid=9876543210&tr=charityTxn&tn=Donation&am=${amount}&cu=INR`;
  }

  processBankTransfer(amount: number, accountNumber: string, ifscCode: string) {
    console.log(`Bank Transfer: ₹${amount} to ${accountNumber} (IFSC: ${ifscCode})`);
    return { status: 'pending', reference: 'BANK123456' };
  }

  processPayPalDonation(amount: number) {
    return new Promise((resolve, reject) => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: amount.toFixed(2) },
            }],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            resolve(`Donation successful! Thank you, ${details.payer.name.given_name}`);
          });
        },
      }).render('#paypal-button-container');
    });
  }

  processRazorpayPayment(amount: number) {
    return new Promise((resolve, reject) => {
      const options = {
        key: 'your-razorpay-key',
        amount: amount * 100,
        currency: 'INR',
        name: 'Charity Donation',
        description: 'Support a cause',
        image: 'assets/logo.png',
        handler: function (response: any) {
          resolve(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Donor',
          email: 'donor@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    });
  }
}
