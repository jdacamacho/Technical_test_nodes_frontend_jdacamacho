import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../models/node';
import { NodeDTO } from '../DTORequest/node-dto';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private urlEndPoint: string = 'http://localhost:5000/api/nodes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  listNodes(): Observable<Node[]>
  {
    return this.http.get<Node[]>(this.urlEndPoint);
  }

  listNodesByName(name: String): Observable<Node[]>
  {
    return this.http.get<Node[]>(this.urlEndPoint + '/name/?name=' + name);
  }

  createNode(node: NodeDTO): Observable<NodeDTO>
  { 
    return this.http.post<Node>(this.urlEndPoint, node , {headers: this.httpHeaders});
  }

  updateNode(id: number, node: NodeDTO): Observable<NodeDTO>
  {
    return this.http.put<Node>(this.urlEndPoint + '/' + id, node , {headers: this.httpHeaders});
  }

  getNode(id: number): Observable<Node>
  {
    return this.http.get<Node>(this.urlEndPoint + '/' + id);
  }

  deleteNode(id: number): Observable<boolean>
  {
    return this.http.delete<boolean>(this.urlEndPoint + '/' + id);
  }

}
