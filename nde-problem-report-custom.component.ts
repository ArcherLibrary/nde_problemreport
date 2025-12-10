import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-report-a-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-aproblem-custom.component.html',
  styleUrl: './report-aproblem-custom.component.scss'
})
export class ReportAProblemComponent implements OnInit {
  @Input() private hostComponent!: any;
  
  reportUrl: string = '';
  openURLTitle: string = '';
  openURLSource: string = '';
  encoded: string = '';
  shouldDisplay: boolean = false;
  
  private formBaseUrl = '<your report URL here>';
  
  constructor(private elementRef: ElementRef) {
    console.log('ReportAProblemComponent CONSTRUCTOR CALLED');
  }
  
  ngOnInit() {
    console.log('ReportAProblemComponent ngOnInit CALLED');
    
    // Check if this instance is inside the Details section
    this.shouldDisplay = this.isInDetailsContainer();
    
    if (this.shouldDisplay) {
      console.log('This is the Details container, displaying button');
      this.buildReportUrl();
      console.log('Report URL after build:', this.reportUrl);
    } else {
      console.log('Not the Details container, hiding button');
    }
  }
  
  private isInDetailsContainer(): boolean {
    try {
      // Get the native element
      const element = this.elementRef.nativeElement;
      
      // Look for the parent div with id="brief.results.tabs.details"
      const parentContainer = element.closest('[id="brief.results.tabs.details"]');
      
      if (parentContainer) {
        console.log('Found Details container');
        return true;
      }
      
      console.log('Not in Details container');
      return false;
      
    } catch (error) {
      console.error('Error checking container:', error);
      return false;
    }
  }
  
  private buildReportUrl() {
    console.log('buildReportUrl() called');
    
    try {
      // Access the correct path: hostComponent.searchResult.pnx
      const searchResult = this.hostComponent?.searchResult;
      const pnx = searchResult?.pnx;
      
      console.log('searchResult:', searchResult);
      console.log('pnx:', pnx);
      console.log('pnx.display:', pnx?.display);
      
      this.openURLTitle = pnx?.display?.title?.[0] || '';
      
      console.log('Extracted openURLTitle:', this.openURLTitle);
      
      const currentUrl = window.location.href;
      console.log('currentUrl:', currentUrl);
      
      // Use LibWizard field IDs as parameter names
      const params = new URLSearchParams({
        'Replace with Field ID': currentUrl,        // Referring URL field
        'Replace with Field ID': this.openURLTitle   // Resource Title field
      });
      
      console.log('params.toString():', params.toString());
      
      this.reportUrl = `${this.formBaseUrl}?${params.toString()}`;
      
      console.log('Final reportUrl:', this.reportUrl);
      
    } catch (error) {
      console.error('Error building report URL:', error);
      this.reportUrl = this.formBaseUrl;
      console.log('Fallback reportUrl:', this.reportUrl);
    }
  }
}
