import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { jobValidationSchema } from './jobs.validation'
import { JobControlloer } from './jobs.controller'

const JobRouter = Router()

JobRouter.post(
  '/create-Job',
  zodValidator(jobValidationSchema),
  JobControlloer.createJob
)
JobRouter.delete('/delete-Job/:id', JobControlloer.deleteJob)
JobRouter.patch('/update-Job/:id', JobControlloer.updateJob)
JobRouter.get('/get-Job/:id', JobControlloer.getSingleJob)
JobRouter.get('/get-Job', JobControlloer.getAllJobs)

// /api/admin/users/:userId/block

export default JobRouter
