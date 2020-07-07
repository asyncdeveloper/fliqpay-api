import { Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import SupportRequest, { IRequest } from '../models/SupportRequest';
import * as converter from 'json-2-csv';
import * as  fs from 'fs';

class RequestsController {

    public create = async (req: Request, res: Response): Promise<Response> => {
        let { name, user  } = req.body;

        try {
            let request: IRequest = await new SupportRequest({ name, user }).save();
            return res.status(HttpStatusCodes.CREATED)
                .json({
                    data: {
                        "_id": request._id,
                        "name": request.name,
                        "status": request.status,
                        "user": request.user
                    },
                    message: "Request created successfully."
                });
        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public show = async (req: Request, res: Response): Promise<Response> => {
        try {
            const request: IRequest = await SupportRequest.findOne({
                _id: req.params.id,
            }).populate('user', '_id name role email');

            return res.status(HttpStatusCodes.OK).json({
                message: 'Request retrieved successfully.',
                data: request
            });

        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const requests: IRequest[] = await SupportRequest.find({}).populate('user', '_id name role email');

            return res.status(HttpStatusCodes.OK).json({
                message: 'Requests retrieved successfully.',
                data: requests
            });
        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const request: IRequest = await SupportRequest.findByIdAndUpdate(
                { _id: req.params.id },
            { $set:{ status: req.body.status } },
            { new: true }
            ).populate('user', '_id name role email');

            return res.status(HttpStatusCodes.OK).json({
                message: 'Request updated successfully.',
                data: request
            });

        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public report = async (req: Request, res: Response): Promise<Response> => {
        try {
            const requests = await SupportRequest.find({
                status: 'closed',
                createdAt: {
                    $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
                }
            }).populate('user', 'name role email');

            const data = requests.map(request => {
               return {
                   name: request.name,
                   userName: request.user.name,
                   userRole: request.user.role,
                   userEmail: request.user.email,
                   status: request.status
               }
            });

            const csvData = await converter.json2csvAsync(data);

            await fs.writeFileSync(`reports-${(+new Date).toString(36).slice(-5)}.csv`, csvData);

            return res.status(HttpStatusCodes.OK).json({
                message: 'Report generated successfully.',
            });

        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };
}

export default new RequestsController();
