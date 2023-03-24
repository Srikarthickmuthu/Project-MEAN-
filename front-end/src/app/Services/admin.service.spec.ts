import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AdminService', () => {
  let service: AdminService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler , AdminService],
      imports:[HttpClientTestingModule]
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
