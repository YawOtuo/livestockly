<form onSubmit={formik.handleSubmit}>
<div className="py-5">
  <TextField
    className="w-full"
    label="FARM NAME"
    name="farm_name"
    required={true}
    onChange={formik.handleChange}
    value={formik.values.farm_name}
  />
</div>
<div className="py-5">
  <TextField
    className="w-full"
    label="EMAIL"
    name="email"
    required={true}
    onChange={formik.handleChange}
    value={formik.values.email}
  />
</div>

<div className="py-5">
  <TextField
    className="w-full"
    label="PASSWORD"
    name="password"
    type="password"
    required={true}
    onChange={formik.handleChange}
    value={formik.values.password}
  />
</div>
<div className="flex flex-col gap-4">
  <Button
    sx={{
      color: "grey",
    }}
    f
    onClick={formik.handleSubmit}
    className="text-center text-green1">
    LOGIN
  </Button>
  <div className="flex gap-5 items-center text-xs">
    <p>Don&apos;t have an account already? </p>
    <Link className="text-gray-500 uppercase" href={"/sign-up"}>
      Register
    </Link>
  </div>
</div>
</form>