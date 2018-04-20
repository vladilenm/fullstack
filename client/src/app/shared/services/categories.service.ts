import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {HttpClient} from '@angular/common/http'
import {Category, Message} from '../interfaces'

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)

    return this.http.post<Category>('/api/category', fd)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.patch<Category>(`/api/category/${id}`, fd)
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }
}
