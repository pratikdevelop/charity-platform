

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BlockchainService } from '../../services/blockchain.service';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register-charity',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './register-charity.component.html',
  styleUrls: ['./register-charity.component.css']
})

export class RegisterCharityComponent {
  charityForm: FormGroup;
  isSubmitting = false;
  message = '';

  constructor(private fb: FormBuilder, private blockchainService: BlockchainService) {
    this.charityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      wallet: ['', Validators.required],
      regNumber: ['', Validators.required],
      website: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      bankAccount: ['', Validators.required],
      ifscCode: ['', Validators.required],
      categories: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      instagram: ['']
    });
  }

  async registerCharity() {
    if (this.charityForm.invalid) return;
    this.isSubmitting = true;
    this.message = '';

    const { twitter, facebook, instagram, ...charityData } = this.charityForm.value;
    const socialLinks = { twitter, facebook, instagram };

    try {
      await this.blockchainService.registerCharity(
        charityData.name,
        charityData.description,
        charityData.wallet,
        charityData.regNumber,
        charityData.website,
        charityData.contactEmail,
        charityData.contactPhone,
        charityData.bankAccount,
        charityData.ifscCode,
        charityData.categories.split(','),
        socialLinks
      );
      this.message = 'Charity registered successfully!';
      this.charityForm.reset();
    } catch (error) {
      console.error('Registration failed', error);
      this.message = 'Registration failed. Please try again.';
    }
    this.isSubmitting = false;
  }
}