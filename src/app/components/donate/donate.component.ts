



import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
declare var paypal: any;
declare var Razorpay: any;

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
payWithCard() {
throw new Error('Method not implemented.');
}
  selectedMethod = 'crypto';
  cryptoAmount: number = 0;
  upiID = 'charity@upi';
  upiQR = 'assets/upi-qr.png'; // Replace with actual QR image
  paymentMethods = [
    { label: 'Crypto (ETH, USDT, BTC)', value: 'crypto' },
    { label: 'UPI (Google Pay, PhonePe, Paytm)', value: 'upi' },
    { label: 'Credit/Debit Card (PayPal)', value: 'paypal' },
    { label: 'Bank Transfer', value: 'bank' },
    { label: 'Razorpay (UPI, Card, Wallet)', value: 'razorpay' },
  ];

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.loadPayPalButton();
  }

  async donateCrypto() {
    try {
      await this.blockchainService.donate(this.cryptoAmount);
      alert('Crypto donation successful!');
    } catch (error) {
      console.error(error);
    }
  }

  loadPayPalButton() {
    setTimeout(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: '10.00' }, // Modify dynamically based on user input
            }],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Donation successful! Thank you, ' + details.payer.name.given_name);
          });
        }
      }).render('#paypal-button-container');
    }, 500);
  }

  payWithRazorpay() {
    const options = {
      key: 'your-razorpay-key',
      amount: 1000 * 100, // Amount in paisa
      currency: 'INR',
      name: 'Charity Donation',
      description: 'Support a cause',
      image: 'assets/logo.png',
      handler: function (response: any) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
