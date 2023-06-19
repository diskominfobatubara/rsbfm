@props(['menu'])
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h4 class="m-0"><b>{{ $menu }}</b></h4>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{ url('admin/home') }}">Dashboard</a></li>
                    <li class="breadcrumb-item active">{{ $menu }}</li>
                </ol>
            </div>
        </div>
    </div>
</div>
