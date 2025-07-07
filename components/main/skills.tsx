// components/main/skills.tsx
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

// Your actual skills data mapped to your images
export const PROGRAMMING_CORE_SKILLS = [
  {
    skill_name: "Python",
    image: "python.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "PostgreSQL",
    image: "Postgresql.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java",
    image: "java.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C/C++",
    image: "cpp.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Bash/Shell",
    image: "shell.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MATLAB",
    image: "Matlab.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Git/GitHub",
    image: "github.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jupyter Notebooks",
    image: "jupyter.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Google Colab",
    image: "colab.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "LaTeX",
    image: "latex.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Draw.io",
    image: "draw.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Excel",
    image: "excel.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JIRA",
    image: "jira.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "VS Code",
    image: "vsc.png",
    width: 80,
    height: 80,
  },
] as const;

export const AI_FRAMEWORKS_SKILLS = [
  {
    skill_name: "LangChain",
    image: "langchain.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "LangGraph",
    image: "langgraph.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "AutoGen",
    image: "autogen.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CrewAI",
    image: "crewai.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Hugging Face",
    image: "huggingface.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Weaviate",
    image: "weaviate.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Milvus",
    image: "milvus.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Qdrant",
    image: "qdrant.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Chroma",
    image: "chroma.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Pinecone",
    image: "pinecone.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TensorFlow",
    image: "tensorflow.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "PyTorch",
    image: "pytorch.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "scikit-learn",
    image: "scikitlearn.png",
    width: 80,
    height: 80,
  },
] as const;

export const DATA_SCIENCE_SKILLS = [
  {
    skill_name: "pandas",
    image: "pandas.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "numpy",
    image: "numpy.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Spark",
    image: "spark.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Kafka",
    image: "kafka.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MLflow",
    image: "mlflow.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Databricks",
    image: "Databricks.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "seaborn",
    image: "seaborn.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "scipy",
    image: "scipy.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Plotly",
    image: "plotly.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tableau",
    image: "tableau.png",
    width: 80,
    height: 80,
  },
] as const;

export const DEVOPS_CLOUD_SKILLS = [
  {
    skill_name: "AWS SageMaker",
    image: "sagemaker.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Google Cloud",
    image: "google_cloud.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Azure",
    image: "Azure.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Kubernetes",
    image: "kubernetes.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GitHub Actions",
    image: "github_actions.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "GitLab CI",
    image: "gitlab.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jenkins",
    image: "jenkins.png",
    width: 80,
    height: 80,
  },
] as const;

export const DEVELOPMENT_FRAMEWORKS = [
  {
    skill_name: "FastAPI",
    image: "FastAPI.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Django",
    image: "django.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Streamlit",
    image: "streamlit.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Gradio",
    image: "gradio.png",
    width: 80,
    height: 80,
  },
] as const;

export const SPECIALIZED_SKILLS = [
  {
    skill_name: "CUDA",
    image: "Cuda.png",
    width: 80,
    height: 80,
  },
] as const;

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      {/* Row 0 - Programming Languages & Core Tools (16 skills) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {PROGRAMMING_CORE_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Row 1 - AI Frameworks & Vector DBs (13 skills) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {AI_FRAMEWORKS_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Row 2 - Data Science & Machine Learning (10 skills) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {DATA_SCIENCE_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Row 3 - DevOps & Cloud (7 skills) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {DEVOPS_CLOUD_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Row 4 - Development Frameworks (4 skills) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {DEVELOPMENT_FRAMEWORKS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Row 5 - Specialized (1 skill) */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {SPECIALIZED_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Background Video - Same as original */}
      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};