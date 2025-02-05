import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [CommonModule, MatListModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  unverifiedCharities: any[] = [];

  constructor(private blockchainService: BlockchainService) { }

  async ngOnInit() {
    const allCharities = await this.blockchainService.getCharities();
    this.unverifiedCharities = allCharities.filter(c => !c.isVerified);
  }

  async verifyCharity(charityAddress: string) {
    try {
      await this.blockchainService.verifyCharity(charityAddress);
      this.unverifiedCharities = this.unverifiedCharities.filter(c => c.wallet !== charityAddress);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }
}
