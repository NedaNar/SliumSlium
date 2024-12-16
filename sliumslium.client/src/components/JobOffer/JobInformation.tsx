import { JobOffer } from "../../api/apiModel";
import { getExperience, getPartTime, getRemote } from "../../utils/enumUtils";
import "./jobInformation.css";

interface JobInformationProps {
  offer: JobOffer;
}

export default function JobInformation({ offer }: JobInformationProps) {
  return (
    <>
      <div className="row valign-wrapper jobInformation">
        <i className="tiny material-icons">place</i>
        <strong>&nbsp;&nbsp;Location:&nbsp;</strong>
        {offer.location}
      </div>
      <div className="row valign-wrapper jobInformation">
        <i className="tiny material-icons">show_chart</i>
        <strong>&nbsp;&nbsp;Experience:&nbsp;</strong>
        {getExperience(offer.experienceLevel)}
      </div>
      <div className="row valign-wrapper jobInformation">
        <i className="tiny material-icons">apartment</i>
        <strong>&nbsp;&nbsp;Remote:&nbsp;</strong>
        {getRemote(offer.workEnvironment)}
      </div>
      <div className="row valign-wrapper jobInformation">
        <i className="tiny material-icons">schedule</i>
        <strong>&nbsp;&nbsp;Part Time:&nbsp;</strong>
        {getPartTime(offer.partTime)}
      </div>
    </>
  );
}
