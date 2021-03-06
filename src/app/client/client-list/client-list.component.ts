import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../client';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Observable<Client[]>;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
 
  }

  reloadData() {
    this.clients = this.clientService.getClientsList();
  }

  createClient() {
    this.router.navigate(['add']);
  }

  clientDetails(id: number) {
    this.router.navigate(['details', id]);
  }
  deleteClient(id: number) {
    this.clientService.deleteClient(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateClient(id: number){
    this.router.navigate(['update', id]);
  }

  oncherche(form:any){
    this.clientService.getClientsById(form.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

 

}
