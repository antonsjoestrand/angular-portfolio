import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators'; 
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Observable object with json data
  projects$ = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) { }

  // Loads projects
  loadProjects(projectTypeFilters) {
    this.projects$.next([]);
    this.httpClient.get<any[]>('assets/projects.json').pipe(
      delay(2000),
      // Filter projects on the client side with selected filter
      map(projects => {
        if (!projectTypeFilters.length) {
          return projects;
        }
        return projects.filter(project => projectTypeFilters.includes(project.type));
      })
    )
    .subscribe(projects => {
      this.projects$.next(projects);
    });
  }
}
