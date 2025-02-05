import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BlockchainService } from '../../services/blockchain.service';
import {Chart} from 'chart.js'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-donation-analytics',
  standalone:true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './donation-analytics.component.html',
  styleUrl: './donation-analytics.component.css'
})
export class DonationAnalyticsComponent {
  charityStats: any[] = [];

  constructor(private blockchainService: BlockchainService) { }

  async ngOnInit() {
    const charities = await this.blockchainService.getCharities();
    this.charityStats = await Promise.all(
      charities.map(async (charity) => {
        const stats = await this.blockchainService.getDonationStats(charity.wallet);
        return {
          name: charity.name,
          total: stats.total,
          count: stats.count
        };
      })
    );

    this.loadChart();
  }

  loadChart() {
    const ctx = document.getElementById('donationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.charityStats.map(c => c.name),
        datasets: [{
          label: 'Total Donations (ETH)',
          data: this.charityStats.map(c => c.total),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  }
}
