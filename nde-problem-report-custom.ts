import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-report-a-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nde-problem-report-custom.html',
  styleUrl: './nde-problem-report-custom.scss'
})
export class NdeProblemReportCustom implements OnInit {
  @Input() private hostComponent!: any;
  
  reportUrl: string = '';
  shouldDisplay: boolean = false;
  
  private formBaseUrl = '<your report URL here>';
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
    this.shouldDisplay = this.isInDetailsContainer();
    
    if (this.shouldDisplay) {
      this.buildReportUrl();
    }
  }
  
  private isInDetailsContainer(): boolean {
    try {
      const element = this.elementRef.nativeElement;
      const parentContainer = element.closest('[id="brief.results.tabs.details"]');
      return !!parentContainer;
    } catch (error) {
      console.error('Error checking container:', error);
      return false;
    }
  }
  
  private buildReportUrl() {
    try {
      const pnx = this.hostComponent?.searchResult?.pnx;
      const openURLTitle = pnx?.display?.title?.[0] || '';
      const currentUrl = window.location.href;
      
      const params = new URLSearchParams({
        'Replace with Field ID': currentUrl,
        'Replace with Field ID': openURLTitle
      });
      
      this.reportUrl = `${this.formBaseUrl}?${params.toString()}`;
    } catch (error) {
      console.error('Error building report URL:', error);
      this.reportUrl = this.formBaseUrl;
    }
  }
}
