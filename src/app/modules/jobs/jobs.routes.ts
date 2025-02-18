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
JobRouter.delete('/delete-Job/:id', JobControlloer.deleteJOb)
JobRouter.get('/get-Job/:id', JobControlloer.getSingleJob)
JobRouter.get('/get-Job', JobControlloer.getAllJob)

// /api/admin/users/:userId/block

export default JobRouter
