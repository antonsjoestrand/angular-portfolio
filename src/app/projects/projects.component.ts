import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  projectTypeDropdownOpen = false;
  currentProjectTypeFilters = [];
  projects$ = this.dataService.projects$;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const projectTypeFilters = params['project-type'] || [];
       this.dataService.loadProjects(projectTypeFilters);
       this.currentProjectTypeFilters = projectTypeFilters;
    });

  }

  projectTypeFilterApplied($event) {
    
    this.projectTypeDropdownOpen = false;
    this.router.navigate(['projects'], {queryParams: { 'project-type': $event }})
    
  }

}
