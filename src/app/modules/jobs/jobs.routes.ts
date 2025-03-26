import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { jobValidationSchema } from './jobs.validation'
import { JobControlloer } from './jobs.controller'
import auth from '../../middleware/auth'

const JobRouter = Router()

JobRouter.post(
  '/create-Job',
  zodValidator(jobValidationSchema),
  auth('admin'),
  JobControlloer.createJob
)
JobRouter.delete('/delete-Job/:id', auth('admin'), JobControlloer.deleteJob)
JobRouter.patch('/update-Job/:id', auth('admin'), JobControlloer.updateJob)
JobRouter.get('/get-Job/:id', JobControlloer.getSingleJob)
JobRouter.get('/get-Job', JobControlloer.getAllJobs)

// /api/admin/users/:userId/block

export default JobRouter
