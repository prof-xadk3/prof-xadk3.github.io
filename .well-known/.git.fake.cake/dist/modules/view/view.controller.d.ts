import { Request, Response } from 'express';
import { ViewService } from './view.service';
export declare class ViewController {
    private viewService;
    constructor(viewService: ViewService);
    showHome(req: Request, res: Response): Promise<void>;
}
