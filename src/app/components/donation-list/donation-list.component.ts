import { Component, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent {
  @Input() charityAddress!: string;
  donations: any[] = [];

  constructor(private blockchainService: BlockchainService) { }

  async ngOnInit() {
    this.donations = await this.blockchainService.getDonations(this.charityAddress);
  }
}
